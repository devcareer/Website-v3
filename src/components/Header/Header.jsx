import { Box, Typography } from '@mui/material';
import React from 'react';
import { hero } from '../../assets/Images';

const Header = () => {
  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr">
      <Box>
        <Typography color="#131313" fontSize="72px">
          Fast-Track Your Tech Career
        </Typography>
      </Box>
      <img src={hero} alt="hero-section"></img>
    </Box>
  );
};

export default Header;
