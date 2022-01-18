import React from 'react';
import { createTheme } from '@material-ui/core';
import { red, blue, green } from '@mui/material/colors';

const themeOptions = {
  palette: {
    type: 'light',
    background: {
      paper: '#000000',
    },
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: red[500],
    },
  },
};

export default themeOptions;

// export const themeOptions: ThemeOptions = {
//   palette: {
//     type: 'light',
//     primary: {
//       main: '#3f51b5',
//     },
//     secondary: {
//       main: '#f50057',
//     },
//   },
// };
