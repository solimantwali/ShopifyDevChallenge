import React, { useState } from 'react';
import { Button, Container, Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DropzoneDialog } from 'material-ui-dropzone';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ViewAll from './ViewAll';

const Input = styled('input')({
  display: 'none',
});

const Uploader = () => {
  //const classes = useStyles();
  const [show, setShow] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [currentlyUploading, setCurrentlyUploading] = useState(false);

  const handleFile = ([file]) => file && setImageFile(file);
  const handleDelete = () => setImageFile(null);
  const handleSubmit = ([file]) => {
    const fd = new FormData();
    fd.append('image', file, file.name);
    axios
      .post('api/image/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          setProgress((progressEvent.loaded / progressEvent.total) * 100);
          console.log(
            'upload progress: ',
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          );
        },
      })
      .then(({ data }) => {
        setImageId(data);
        setImageFile(null);
        setCurrentlyUploading(false);
        setShow(false);
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
        bgcolor: 'background.paper',
        boxShadow: 1,
        mt: 2,
        mx: 0,
        borderRadius: 2,
        p: 3,
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
          />
          <Button variant="outlined" component="span">
            Select File
          </Button>
        </label>
        <label htmlFor="icon-button-file">
          <Input accept="image/*" id="icon-button-file" type="file" />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
      </Stack>
      {/* shitty version here */}
      <Button
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
        showFileNamesInPreview={false}
        showFileNames={false}
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
      />
      <Box height={200}>
        {imageId ? (
          <div>
            <img
              src={`api/image/imageCall/${imageId}`}
              alt="Sample Text"
              height={100}
            />
            <a href={`api/image/imageCall/${imageId}`} target="_blank">
              link
            </a>
          </div>
        ) : (
          <Typography variant="body1">no picture uploaded yet</Typography>
        )}
      </Box>
      <Button variant="contained" color="secondary">
        Upload
      </Button>
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
