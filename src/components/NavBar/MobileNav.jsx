import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const navStyle = {
  color: '#888888',
  fontSize: '20px',
  textDecoration: 'none',
};
const MobileNav = ({ menu }) => {
  const [program, setProgram] = useState(false);
  const [community, setCommunity] = useState(false);

  return (
    <Stack
      position="fixed"
      left="0px"
      top="0"
      gap={4}
      sx={{
        backgroundColor: 'white',
        p: '24px',
        height: '100%',
        width: '100%',
        zIndex: '200',
      }}
    >
      <Stack
        onClick={() => menu(false)}
        alignItems="flex-end"
        borderBottom="1px solid #E8E8E8"
        pb="10px"
        sx={{ cursor: 'pointer' }}
      >
        <CloseIcon sx={{ fontSize: '40px' }} />
      </Stack>
      <Box borderBottom="1px solid #E8E8E8" pb="10px">
        <Stack
          onClick={() => setProgram(!program)}
          direction="row"
          justifyContent="space-between"
          sx={{ cursor: 'pointer' }}
        >
          <Typography variant="body1" color="initial" style={navStyle}>
            {' '}
            Programs
          </Typography>
          {program ? (
            <KeyboardArrowDownIcon fontSize="large" />
          ) : (
            <ArrowForwardIosIcon />
          )}
        </Stack>
        {program && (
          <Stack
            ml={3}
            gap={1}
            onClick={() => {
              menu(false);
            }}
          >
            <Link style={navStyle} to="programs/l4d">
              Laptop4developers
            </Link>
            <Link style={navStyle} to="/programs/dpds">
              Dpds
            </Link>
          </Stack>
        )}
      </Box>
      <Box borderBottom="1px solid #E8E8E8" pb="10px">
        <Link
          style={navStyle}
          onClick={() => {
            menu(false);
          }}
        >
          {' '}
          About Us
        </Link>
      </Box>

      <Box borderBottom="1px solid #E8E8E8" pb="10px">
        <Stack
          onClick={() => setCommunity(!community)}
          direction="row"
          justifyContent="space-between"
          sx={{ cursor: 'pointer' }}
        >
          <Typography variant="body1" color="initial" style={navStyle}>
            {' '}
            Community
          </Typography>
          {community ? (
            <KeyboardArrowDownIcon fontSize="large" />
          ) : (
            <ArrowForwardIosIcon />
          )}
        </Stack>
        {community && (
          <Stack
            ml={3}
            gap={1}
            onClick={() => {
              menu(false);
            }}
          >
            <Link style={navStyle} to="/community/talents">
              Talents
            </Link>
            <Link style={navStyle}>Slack Channel</Link>
            <Link style={navStyle}>Forums(Coming Soon)</Link>
            <Link style={navStyle}>Meet Ups(Coming Soon)</Link>
          </Stack>
        )}
      </Box>
      <Box borderBottom="1px solid #E8E8E8" pb="10px">
        <Link
        to='/contact'
          style={navStyle}
          onClick={() => {
            menu(false);
          }}
        >
          Contact Us
        </Link>
      </Box>
    </Stack>
  );
};

export default MobileNav;
