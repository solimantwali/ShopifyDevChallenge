import React from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
//import Typography from '@material-ui/core/Typography';

const NavBar = () => {
  const pages = ['home', 'add', 'search'];
  return (
    <Box
      sx={{
        flexGrow: 1,
        color: 'palette.secondary',
      }}
    >
      <AppBar position="static" sx={{ borderRadius: 2, boxShadow: 5 }}>
        <Toolbar>
          <Typography
            variant="h6"
            fontFamily="Arial"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Shopify Developer Intern Challenge 2022
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              maxWidth: '100%',
            }}
            text-align="center"
          >
            {pages.map((page) => (
              <Button
                key={page}
                sx={{
                  color: 'white',

                  maxHeight: '100%',
                  fontFamily: 'Arial',
                }}
                text-align="center"
                href={page === 'home' ? '/' : page}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Typography sx={{ flexGrow: 0 }} variant="subtitle1">
            Soliman Ali
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    // <Box sx={{ flexGrow: 1 }}>
    //   <AppBar position="static">
    //     <Toolbar>
    //       <div>
    //         <Typography variant="h5" color="inherit" width="xl">
    //           Shopify Developer Intern Challenge 2022
    //         </Typography>
    //       </div>
    //       <Button color="inherit">Login</Button>
    //     </Toolbar>
    //   </AppBar>
    // </Box>
  );
};

export default NavBar;
