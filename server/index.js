// const express = require("express");

// const mongoose = require("mongoose");
// const ItemModel = require("./models/Items");
// const path = require("path");
// const crypto = require("crypto");

// const multer = require("multer");
// const { GridFsStorage } = require("multer-gridfs-storage");
// const Grid = require("gridfs-stream");
// const methodOverride = require("method-override");
// const bodyParser = require("body-parser");

// const cors = require("cors");

// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(methodOverride("_method"));
// app.use(express.json());
// app.use(cors());

// // Mongo URI
// const mongoURI =
//   "mongodb+srv://solimantwali:S01iman811@cluster0.o4p2y.mongodb.net/DevChallengeDB?retryWrites=true&w=majority";

// // Create mongo connection
// const conn = mongoose.createConnection(mongoURI);

// // Init gfs
// let gfs;

// conn.once("open", () => {
//   // Initialize stream
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection("uploads");
// });

// // Create storage engine (from multer-gridfs-stroage documentation)
// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString("hex") + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: "uploads",
//         };
//         resolve(fileInfo);
//       });
//     });
//   },
// });
// const upload = multer({ storage });

// // all API requests are in this file .. for now .. routes in other files coming later
// app.get("/getItems", (req, res) => {
//   ItemModel.find({}, (err, result) => {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(result);
//     }
//   });
// });

// // @route POST /upload
// // @desc  Uploads file to DB
// app.post("/upload", upload.single("file"), (req, res) => {
//   //res.json({ file: req.file });
//   res.redirect("http://localhost:3000");
// });

// //needs to be async because we want to save info
// app.post("/createItem", async (req, res) => {
//   const item = req.body;
//   const newItem = new ItemModel(item);
//   await newItem.save();
//   res.json(item);
// });

// const port = 3001;

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });
