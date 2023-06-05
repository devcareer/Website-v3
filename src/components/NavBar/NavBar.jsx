import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button,  Stack } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { Logo } from '../../assets/Images';
import { CommunityCard, MobileNav, ProgramCard } from '../index';
const navStyle = {
  color: '#888888',
  fontSize: '20px',
  textDecoration: 'none',
};
const activeStyle = {
  fontSize: '20px',
  color: '#212121',
  fontWeight: '500',
  textDecoration: 'none',
  paddingBottom: '5px',
  borderBottomStyle: ' solid',
};

const NavBar = () => {
  const [menu,setMenu]=useState(false)
  const showMenu=()=>{
     setMenu(!menu)
  }
  return (
    <Box
      sx={{
        paddingBlock: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width:{xs:"90%",sm:"85%"},
        mx: 'auto',
      }}
    >
      <Stack  alignItems="center" gap={2.5} sx={{
            flexDirection:{xs:"row-reverse",sm:"row"},
            justifyContent:{xs:"space-between",sm:"flex-start"},
            width:{xs:"100%",sm:"auto"}
            

      }}>
        <Box onClick={showMenu} display={{ xs: 'block', lg: 'none' }} sx={{cursor:'pointer'}}>
          <MenuIcon sx={{ fontSize: '40px' }} />
        </Box>
       <Box >
       <Link to="/">
          <img src={Logo} alt="logo"  />
        </Link>
       </Box>
      
      </Stack>
      <Box display={menu?'block':"none"} >
        <MobileNav menu={setMenu} />
      </Box>
      <Stack direction="row" gap="34px" display={{ xs: 'none', lg: 'flex' }}>
        <Box
          position="relative"
          sx={{
            ':hover .dropdown': {
              display: 'block',
            },
          }}
        >
          <NavLink
            to="/programs"
            style={({ isActive }) => (isActive ? activeStyle : navStyle)}
          >
            Programs
          </NavLink>
          <Box
            position="absolute"
            sx={{ width: '288px', display: 'none', zIndex: '900' }}
            className="dropdown"
          >
            <ProgramCard />
          </Box>
        </Box>
        <Box>
          <NavLink
            to="/aboutus"
            style={({ isActive }) => (isActive ? activeStyle : navStyle)}
          >
            About Us
          </NavLink>
        </Box>
        <Box
          position="relative"
          sx={{
            ':hover .dropdown': {
              display: 'block',
            },
          }}
        >
          <NavLink
            to="/community"
            style={({ isActive }) => (isActive ? activeStyle : navStyle)}
          >
            Community
          </NavLink>
          <Box
            position="absolute"
            sx={{ width: '288px', display: 'none', zIndex: '900' }}
            className="dropdown"
          >
            <CommunityCard />
          </Box>
        </Box>
        <Box>
          <NavLink
            to="/contactus"
            style={({ isActive }) => (isActive ? activeStyle : navStyle)}
          >
            Contact Us
          </NavLink>
        </Box>
      </Stack>
      <Link to="/support" style={{textDecoration:"none"}}>
        <Button
          disableElevation
          variant="contained"

          
          sx={{
            color: '#FEFEFE',
            paddingInline: '32px',
            paddingBlock: '14px',
            borderRadius: '8px',
            fontWeight: '500',
            display:{xs:"none",sm:"block"},
          }}
        >
          Support Us
        </Button>
      </Link>
    </Box>
  );
};

export default NavBar;
