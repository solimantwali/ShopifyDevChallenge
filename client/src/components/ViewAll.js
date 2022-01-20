import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  Box,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Chip,
} from '@mui/material';
import { red, blue, green, grey } from '@mui/material/colors';
import { withStyles } from '@mui/styles';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

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

  const handleDelete = (file) => {
    //console.log(file);
    //const fd = new FormData();
    // fd.append('image', file, file.name);
    //axios.delete('api/image/delete', { headers: {} }, { data: { file } });
    console.log('delete coming soon ...');
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
          bgcolor: '#CCE8CC',
        },
      }}
      maxWidth="100%"
    >
      <Typography variant="h6">Browse All</Typography>
      <Box alignItems="center">
        {imgList.length === 0 ? (
          <Typography>no imgs</Typography>
        ) : (
          <Container
            sx={{
              bgcolor: 'primary.light',
              boxShadow: 0,
              mt: 3,
              mx: 'auto',
              borderRadius: 2,
              p: 3,
              maxWidth: '80%',
            }}
          >
            <ImageList
              sx={{
                width: '100%',
                height: 800,
                mx: 'auto',
                my: 0,
                transform: 'translateZ(0)',
                rowHeight: '5%',
              }}
              cols={5}
            >
              {imgList.map((item) => (
                <ImageListItem
                  key={item._id}
                  sx={{
                    '&:hover': {
                      '& .daChild': {
                        visibility: 'visible',
                      },
                    },
                  }}
                >
                  <img
                    src={`api/image/imageCall/${item._id}?w=164&h=164&fit=crop&auto=format`}
                    alt={item.metadata.ogName}
                    loading="lazy"
                  />

                  <ImageListItemBar
                    className="daChild"
                    sx={{
                      visibility: 'hidden',
                      background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                    }}
                    title={item.metadata.ogName}
                    position="top"
                    actionIcon={
                      <IconButton
                        sx={{ color: 'white' }}
                        aria-label={`star ${item.title}`}
                        onClick={() => handleDelete([item])}
                      >
                        <DeleteForeverRoundedIcon />
                      </IconButton>
                    }
                    actionPosition="right"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Container>
        )}
      </Box>
    </Container>
  );
};

export default ViewAll;
