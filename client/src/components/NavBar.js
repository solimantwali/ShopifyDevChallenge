import React from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Button,
  Box,
} from '@mui/material';
//import Typography from '@material-ui/core/Typography';

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            fontFamily="Arial"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Shopify Developer Intern Challenge 2022
          </Typography>
          <Typography variant="subtitle1">Soliman Ali</Typography>
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
