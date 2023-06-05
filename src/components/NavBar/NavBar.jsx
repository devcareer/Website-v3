import { Box, Button, Stack } from '@mui/material';
import { NavLink,Link } from 'react-router-dom';
import { Logo } from '../../assets/Images';
import { ProgramCard,CommunityCard } from '../index';
const navStyle = {
  color: '#888888',
  fontSize: '20px',
  textDecoration: 'none',
 
};
const activeStyle={
  fontSize: '20px',
   color:"#212121",
   fontWeight:"500",
   textDecoration:"none",
   paddingBottom: "5px",
   borderBottomStyle:" solid"
}

const NavBar = () => {
  return (
    <Box
      sx={{
        paddingBlock: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        mx: 'auto',
      }}
    >
      <Link to='/'>
        <img src={Logo} alt="logo" />
      </Link>
      <Stack direction="row" gap="34px">
        <Box
          position="relative"
          sx={{
            ':hover .dropdown': {
              display: 'block',
            },
          }}
        >
          <NavLink to='/programs' style={({ isActive })=>isActive? activeStyle:navStyle} >Programs</NavLink>
          <Box
            position="absolute"
            sx={{ width: '288px', display: 'none',zIndex:"900" }}
            className="dropdown"
          >
            <ProgramCard />
          </Box>
        </Box>
        <Box>
          <NavLink to='/about' style={({ isActive })=>isActive? activeStyle:navStyle}>About Us</NavLink>
        </Box>
        <Box
          position="relative"
          sx={{
            ':hover .dropdown': {
              display: 'block',
            },
          }}
        >
          <NavLink to='/community' style={({ isActive })=>isActive? activeStyle:navStyle}>Community</NavLink>
          <Box
            position="absolute"
            sx={{ width: '288px', display: 'none',zIndex:"900" }}
            className="dropdown"
          >
            <CommunityCard />
          </Box>
        </Box>
        <Box>
          <NavLink to='/contactus' style={({ isActive })=>isActive? activeStyle:navStyle}>Contact Us</NavLink>
        </Box>
      </Stack>
      <Link to='/support'>
      <Button
      disableElevation
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
      </Link>
    </Box>
  );
};

export default NavBar;
