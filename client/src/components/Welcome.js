import { Container, Box, Typography } from '@mui/material';
import React from 'react';
import { red, blue, green } from '@mui/material/colors';

const Welcome = () => {
  return (
    <Container
      sx={{
        bgcolor: 'primary.light',
        boxShadow: 1,
        mt: 2,
        mx: 0,
        borderRadius: 2,
        p: 2,
        '&:hover': {
          bgcolor: '#CCE8CC',
        },
      }}
      maxWidth="100%"
    >
      <Typography variant="h4" sx={{ mb: 1 }}>
        Welcome!
      </Typography>
      <Typography variant="body1">
        Feel free to take a look around :) Use the "Upload Image(s)" panel to
        upload one or many images to the database. You can view all the images
        currently stored in the "Browse All" panel.
      </Typography>
    </Container>
  );
};

export default Welcome;
