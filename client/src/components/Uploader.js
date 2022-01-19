import React, { useState, useEffect } from 'react';
import { Button, Container, Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DropzoneArea, DropzoneDialog } from 'material-ui-dropzone';
import { red, blue, green } from '@mui/material/colors';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ViewAll from './ViewAll';
import Dropzone from 'react-dropzone';

const Input = styled('input')({
  display: 'none',
});

const Uploader = ({ refresh }) => {
  const updateList = () => {
    axios.get('/api/image/all').then((response) => {
      refresh(response.data);
      //console.log(imgList.length);
    });
  };
  // useEffect(() => {
  //   axios.get('/api/image/all').then((response) => {
  //     refresh(response.data);
  //   });
  // }, []);
  //const classes = useStyles();
  const [show, setShow] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [currentlyUploading, setCurrentlyUploading] = useState(false);
  const [myimgList, setMyImgList] = useState([]);

  const handleFile = ([file]) => {
    //console.log('handleFile below:');
    //console.log('file: ', file);
    //console.log(file && setImageFile(file));
    if (file) {
      //console.log('file exists');
      const myFile = file;
      setImageFile(myFile);
      //console.log('imagefile:', imageFile);
    }
    //setImageFile(file).then(console.log('imagefile:', imageFile));
  };

  // const handleFile = (e) => {
  //   console.log('yo', e.target);
  //   if (e) {
  //     setImageFile(e.target.files);
  //   }
  // };
  const handleDelete = () => setImageFile(null);
  const fileList = document.getElementById('fileList');
  const handleSubmit = ([file]) => {
    console.log('hi', file);
    const fd = new FormData();
    fd.append('image', file, file.name);
    console.log(fd);
    axios
      .post('api/image/upload', fd, {
        onUploadProgress: (progressEvent) => {
          setProgress((progressEvent.loaded / progressEvent.total) * 100);
          console.log(
            'upload progress: ',
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          );
        },
      })
      .then(({ data }) => {
        console.log('data:', data);
        setImageId(data);
        setImageFile(null);
        setCurrentlyUploading(false);
        setShow(false);
        updateList();
      })
      .catch((err) => {
        if (err.response.status === 400) {
          const errMsg = err.response.data;
          if (errMsg) {
            console.log('bruh');
            console.log(errMsg);
            alert(errMsg);
          }
        } else if (err.response.status === 500) {
          console.log('db error');
          alert('db error');
        } else {
          console.log('other error');
        }
        setCurrentlyUploading(false);
        setShow(false);
      });
  };

  return (
    <Container
      sx={{
        bgcolor: 'primary.light',
        boxShadow: 1,
        mt: 2,
        mx: 0,
        borderRadius: 2,
        p: 3,
        '&:hover': {
          bgcolor: blue[100],
        },
      }}
      maxWidth="100%"
    >
      <Box>
        <Typography variant="body1" gutterBottom>
          Click button below to upload an image(s)
        </Typography>
      </Box>

      <Stack direction="row" alignItems="center" spacing={2}>
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={(e) => {
              console.log('e.target.files', e.target.files);
              // const a = e.target.files[0].name;
              // console.log('a', a);
              // const b = e.target.files[0]
              // let fileArr = [];
              // fileArr.push(e.target.files[0]);
              // console.log(fileArr.length);
              handleFile(e.target.files);
              // setImageFile(e.target.files[0]);
              console.log(imageFile);
            }}
          />

          <Button variant="outlined" component="span">
            Select A File
          </Button>
        </label>
      </Stack>

      <div>
        <Dropzone onDrop={(acceptedFiles) => handleFile(acceptedFiles)}>
          {({ getRootProps, getInputProps, isDragActive }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Box
                  sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    mt: 2,
                    mx: 0,
                    borderRadius: 2,
                    p: 3,
                    border: 3,
                    borderColor: 'primary.main',
                  }}
                >
                  {imageFile ? (
                    <img height={200} src={URL.createObjectURL(imageFile)} />
                  ) : (
                    <Typography>
                      Click the button above or drag files here ...
                    </Typography>
                  )}
                </Box>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
      {/* shitty version here */}
      {/* <Button
        variant="outlined"
        color="secondary"
        onClick={() => setShow(true)}
      >
        Select File
      </Button>
      <DropzoneDialog
        open={show}
        onChange={handleFile}
        onClose={() => setShow(false)}
        onDelete={handleDelete}
        acceptedFiles={['image/jpeg', 'image/png']}
        maxFileSize={5000000}
        filesLimit={1}
        showFileNamesInPreview={true}
        showFileNames={true}
        dropzoneText={'Drag and drop file here or click icon to browse:'}
        getFileAddedMessage={() => 'file added!'}
        getFileRemovedMessage={() => 'file removed!'}
        onAlert={(alert) => console.log({ alert })}
        getFileLimitExceedMessage={() => 'file is too big'}
        getDropRejectMessage={(file) => {
          if (file.size > 5000000) return 'file is too big';
          else return 'invalid file type';
        }}
        onSave={handleSubmit}
      /> */}
      {/* <Box
        height={200}
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          mt: 2,
          mx: 0,
          borderRadius: 2,
          p: 3,
          border: 3,
          borderColor: 'primary.main',
        }}
      >
        {imageId ? (
          <div>
            <img
              src={`api/image/imageCall/${imageId}`}
              alt="Sample Text"
              height={200}
            />
            <a href={`api/image/imageCall/${imageId}`} target="_blank">
              link
            </a>
          </div>
        ) : (
          <Typography variant="body1">no picture uploaded yet</Typography>
        )}
      </Box> */}
      <Box display="flex" alignItems="center">
        <Button
          variant="contained"
          color="secondary"
          sx={{
            mt: 3,
            mr: 3,
          }}
          type="submit"
          onClick={(e) => {
            // console.log(e.target.files);
            handleSubmit([imageFile]);
          }}
        >
          Submit
        </Button>
        <Typography
          sx={{
            mt: 3,
          }}
        >
          {imageFile ? progress : <Typography>lol</Typography>}
        </Typography>
      </Box>

      {/* <ViewAll imgList={myimgList} /> */}
    </Container>
  );
};

export default Uploader;

{
  /* <div className={classes.muiVersion}>
<div className={classes.imageSection}>
  {imageId ? (
    <>
      <img
        className={classes.img}
        src={`api/image/${imageId}`}
        alt="material ui version preview"
      />
      <a
        className={classes.link}
        href={`api/image/${imageId}`}
        target="_blank"
      >
        link
      </a>
    </>
  ) : (
    <p className={classes.nopic}>no picture uploaded yet</p>
  )}
</div>
<Button onClick={() => setShow(true)}>Click here to upload</Button>
<DropzoneDialog
  open={show}
  onChange={handleFile}
  onClose={() => setShow(false)}
  onDelete={handleDelete}
  acceptedFiles={['image/jpeg', 'image/png']}
  maxFileSize={5000000}
  filesLimit={1}
  showFileNamesInPreview={false}
  showFileNames={false}
  dropzoneText={'Drop it here'}
  getFileAddedMessage={() => 'file added!'}
  getFileRemovedMessage={() => 'file removed!'}
  onAlert={(alert) => console.log({ alert })}
  getFileLimitExceedMessage={() => 'file is too big'}
  getDropRejectMessage={(file) => {
    if (file.size > 5000000) return 'file is too big';
    else return 'invalid file type';
  }}
  onSave={handleSubmit}
/>
</div> */
}
