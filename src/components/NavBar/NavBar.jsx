import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Button, Stack } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { Logo } from '../../assets/Images';
import {
  MobileNav,
  ProgramCard,
  GovernmentCard,
  CommunityCard,
} from '../index';
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
  const [menu, setMenu] = useState(false);
  const showMenu = () => {
    setMenu(!menu);
  };
  return (
    <Box
      sx={{
        paddingBlock: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: { xs: '90%', sm: '85%' },
        maxWidth: { xl: '1200px' },
        mx: 'auto',
      }}
    >
      <Stack
        alignItems="center"
        gap={2.5}
        sx={{
          flexDirection: { xs: 'row-reverse', sm: 'row' },
          justifyContent: { xs: 'space-between', sm: 'flex-start' },
          width: { xs: '100%', sm: 'auto' },
        }}
      >
        <Box
          onClick={showMenu}
          display={{ xs: 'block', xl: 'none' }}
          sx={{ cursor: 'pointer' }}
        >
          <MenuIcon sx={{ fontSize: '40px' }} />
        </Box>
        <Box>
          <Link to="/">
            {/* <img src={Logo} alt="logo"  /> */}
            <Box
              component="img"
              src={Logo}
              width={{ xs: '100px', lg: '183px' }}
            ></Box>
          </Link>
        </Box>
      </Stack>
      <Box display={menu ? 'block' : 'none'}>
        <MobileNav menu={setMenu} />
      </Box>
      <Stack direction="row" gap="34px" display={{ xs: 'none', xl: 'flex' }}>
        <Box
          position="relative"
          sx={{
            ':hover .dropdown': {
              display: 'block',
            },
          }}
        >
          <NavLink
            onClick={(e) => e.preventDefault()}
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
        <Box
          position="relative"
          sx={{
            ':hover .dropdown': {
              display: 'block',
            },
          }}
        >
          <NavLink
            onClick={(e) => e.preventDefault()}
            to="/government"
            style={({ isActive }) => (isActive ? activeStyle : navStyle)}
          >
            Government
          </NavLink>
          <Box
            position="absolute"
            sx={{ width: '288px', display: 'none', zIndex: '900' }}
            className="dropdown"
          >
            <GovernmentCard />
          </Box>
        </Box>
        <Box>
          <NavLink
            to="/about"
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
            onClick={(e) => e.preventDefault()}
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
        {/* <Box>
          <NavLink
            to="/contact"
            style={({ isActive }) => (isActive ? activeStyle : navStyle)}
          >
            Contact Us
          </NavLink>
        </Box> */}
      </Stack>
      <Link to="/support" style={{ textDecoration: 'none' }}>
        <Button
          disableElevation
          variant="contained"
          sx={{
            color: '#FEFEFE',
            paddingInline: '32px',
            paddingBlock: '14px',
            borderRadius: '8px',
            fontWeight: '500',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          Support Us
        </Button>
      </Link>
    </Box>
  );
};

export default NavBar;
