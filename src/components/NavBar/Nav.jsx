import { AppBar, Box, Button, Tab, Tabs} from '@mui/material';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { Logo } from '../../assets/Images';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
const Nav = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          bgcolor: 'white',
          paddingBlock: '16px',
          borderBottom: '1px solid #B2B2B2',
        }}
        elevation={0}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ maxWidth: '1200px', width: '100%', mx: 'auto' }}
        >
          <Box>
            <img src={Logo} alt="devcareers logo" />
          </Box>
         
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Tabs where selection follows focus"
            TabIndicatorProps={{
              style: { transition: 'none'},
            }}
            
            
          >
           <Tab  component={ProgramList} />
            <Tab disableRipple={true} label=" About Us" sx={{fontWeight:"400",fontSize:"18px",textTransform:"none"}}/>
            <Tab disableRipple={true} label="Community" sx={{fontWeight:"400",fontSize:"18px",textTransform:"none"}}/>
            <Tab disableRipple={true} label=" Contact Us" sx={{fontWeight:"400",fontSize:"18px",textTransform:"none"}}/>
          </Tabs>
          <Button
            variant="contained"
            sx={{
              color: '#FEFEFE',
              paddingInline: '32px',
              paddingBlock: '14px',
              borderRadius: '8px',
              fontWeight: '500',
            }}
          >
            Support Us
          </Button>
        </Stack>
      </AppBar>
    </Box>
  );
};

export default Nav;


const ProgramList=()=>{
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return(
    <Box>
    <Tab
    disableRipple={true}
    label='Programs'
    sx={{fontWeight:"400",fontSize:"18px",textTransform:"none"}}
      id="fade-button"
      aria-controls={open ? 'fade-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
    />
    <Menu
      id="fade-menu"
      MenuListProps={{
        'aria-labelledby': 'fade-button',
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      TransitionComponent={Fade}
    >
      <MenuItem onClick={handleClose}>Laptop4Developers</MenuItem>
      <MenuItem onClick={handleClose}>DPDs (In partnership with AltSchool Africa)</MenuItem>
    </Menu>
  </Box>
  )
    
}