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

const ViewAll = ({ imgList }) => {
  // const [imgList, setImgList] = useState([]);
  //console.log(imgList.length);
  // useEffect(() => {
  //   setImgList(img_list);
  //   axios.get('/api/image/all').then((response) => {
  //     setImgList(response.data);
  //     //     console.log(imgList.length);
  //   });
  // }, []);

  return (
    <Container
      sx={{
        bgcolor: 'background.paper',
        boxShadow: 3,
        mt: 2,
        mx: 0,
        borderRadius: 2,
        p: 3,
      }}
      maxWidth="100%"
    >
      <Typography variant="h6">Browse All</Typography>
      <Box sx={{ minHeight: '1000px' }}>
        {imgList.length === 0 ? (
          <div>no imgs</div>
        ) : (
          <ImageList
            sx={{ width: '100%', height: '20%', rowHeight: '5%' }}
            cols={5}
          >
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
