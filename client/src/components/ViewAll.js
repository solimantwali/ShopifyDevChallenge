import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Box,
  Typography,
  ImageList,
  ImageListItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const ViewAll = () => {
  const [imgList, setImgList] = useState([]);
  //console.log(imgList.length);
  useEffect(() => {
    axios.get('/api/image/all').then((response) => {
      setImgList(response.data);
      console.log(imgList.length);
    });
  }, []);

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
      width="auto"
    >
      <Typography variant="subtitle1">All Images in DB:</Typography>
      <Box>
        {imgList.length === 0 ? (
          <div>no imgs</div>
        ) : (
          <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {imgList.map((item) => (
              <ImageListItem key={item._id}>
                <img
                  src={`api/image/imageCall/${item._id}?w=164&h=164&fit=crop&auto=format`}
                  alt={item.fileName}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
      </Box>
    </Container>
  );
};

export default ViewAll;
