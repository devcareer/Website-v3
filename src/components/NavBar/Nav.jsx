import { AppBar, Box, Button, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

import { Logo } from '../../assets/Images';
const Nav = () => {
  return (
    <Box>
      <AppBar position="static"  sx={{ bgcolor:'white',padding:"10px"}}>
        <Stack direction='row'  justifyContent="space-between" alignItems="center" sx={{border:'2px solid red',maxWidth:"1200px",m:"auto"}}>
          <Box>
            <img src={Logo} alt="devcareers logo" />
          </Box>
          <Stack direction="row" spacing={3}>
            <Typography variant="body1" color="initial">
              Programs
            </Typography>
            <Typography variant="body1" color="initial">
              About Us
            </Typography>
            <Typography variant="body1" color="initial">
              Community
            </Typography>
            <Typography variant="body1" color="initial">
              Contact Us
            </Typography>
          </Stack>
          <Button variant="contained">Support Us</Button>
        </Stack>
      </AppBar>
    </Box>
  );
};

export default Nav;
