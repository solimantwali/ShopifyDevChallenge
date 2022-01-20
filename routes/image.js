const mongoose = require('mongoose');
const { GridFsStorage } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const router = require('express').Router();
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const { Stream } = require('stream');
require('dotenv').config();

const mongo_URI =
  'mongodb+srv://solimantwali:S01iman811@cluster0.o4p2y.mongodb.net/DevChallengeDB?retryWrites=true&w=majority';
const conn = mongoose.createConnection(mongo_URI);

// gfs acts like a mongoose model
let gfs, gridfsBucket;
conn.once('open', () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'images',
  });
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('images');
});

// storage engine
const storage = new GridFsStorage({
  url: mongo_URI,

  // define function that will be called every time a new file is created
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      // crypto package used to generate 16 random hex characters, turned into string to handle uploads of same name
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        // add file extension
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'images',
          metadata: { ogName: file.originalname },
        };
        // resolve properties to add to the new file document in db
        resolve(fileInfo);
      });
    });
  },
});

// now set up multer to use gridfs storage we just created.
// going to check for file size and file type. both can be changed to suit needs.
const maxFileSize = 20000000; // 20MB
const filetypes = /jpeg|jpg|png|gif/; // regex with diff file types

const store = multer({
  storage,
  // limit the size to maxFileSize
  limits: { fileSize: maxFileSize },
  // use helper function to filter file types
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// accepted file formats helper function - checks file extension as well as MIME type
function checkFileType(file, cb) {
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('filetype'); // error msg
  }
}

// middleware to handle incorrect file type or size
const uploadMiddleware = (req, res, next) => {
  // multer also has support for multiple images, here we just have single.
  const upload = store.single('image');
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // file is too large
      return res.status(400).send('File too large');
    } else if (err) {
      // invalid filetype
      if (err === 'filetype') return res.status(400).send('Image files only');
      // unknown error
      return res.sendStatus(500);
    }
    // all good, proceed
    next();
  });
};

// POST route to handle incoming files using uploadMiddleware
// we can set another smaller file size limit on routes that use the upload middleware
const maxFileSize_route = 5000000;
router.post('/upload/', uploadMiddleware, async (req, res) => {
  // get the .file property from req added by uploadMiddleware, and the id of that file
  const { file } = req;
  const { id } = file;
  if (file.size > maxFileSize_route) {
    deleteImage(id);
    return res.status(400).send('file size may not exceed 5mb');
  }
  console.log('uploaded file: ', file);
  return res.send(file.id);
});

// delete image helper function
const deleteImage = (id) => {
  // check if argument
  if (!id || id === 'undefined') return res.status(400).send('no image id');
  // make mongoose ObjectId from the given id
  const _id = new mongoose.Types.ObjectId(id);
  gfs.delete(_id, (err) => {
    if (err) return res.status(500).send('image deletion error');
  });
};

// GET route for frontend to access images with
router.get('/imageCall/:id', ({ params: { id } }, res) => {
  //console.log(id);
  // if no id return error
  if (!id || id === 'undefined') {
    console.log(!id);
    return res.status(400).send('no image id');
  }
  // CHECK FOR VALID ID HERE!
  // cast id to mongoose objectId type
  const _id = mongoose.Types.ObjectId(id);
  // search for image by id
  const fileFound = gridfsBucket.find({ _id });
  fileFound.toArray((err, files) => {
    if (!files || files.length === 0)
      return res.status(400).send('no files exist');
    // if file exists, send the data
    gridfsBucket.openDownloadStream(_id).pipe(res);
  });
});

// get all images
router.get('/all', async (req, res) => {
  //console.log('bro');
  const cursor = gridfsBucket.find({});

  const allValues = await cursor.toArray();
  //console.log(allValues);
  // Files exist
  return res.json(allValues);
});

module.exports = router;
