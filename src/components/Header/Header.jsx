import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { hero } from '../../assets/Images';

const Header = () => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="1fr 1fr"
      pt="24px"
      pb="128px"
      gap="40px"
    >
      <Box pt="36px">
        <Typography color="misc.100" fontSize="72px" fontWeight="700">
          Fast-Track Your Tech Career
        </Typography>
        <Typography
          color="text.grey.500"
          fontSize="20px"
          fontWeight="400"
          mt="32px"
          mb="60px"
        >
          Our mission is to support individuals seeking to enter the tech field
          by helping them overcome the challenge of selecting a programming
          specialization and offering valuable learning tools.
        </Typography>
        <Stack direction="row" gap="40px">
          <Button
            fontWeight="500"
            fontSize="20px"
            variant="outlined"
            sx={{ py: '20px', flexBasis: '40%', borderRadius: '8px' }}
          >
            Create Mini-CV
          </Button>
          <Button
            fontWeight="500"
            fontSize="20px"
            // variant="outlined"
            sx={{
              py: '20px',
              flexBasis: '40%',
              color: '#037B62',
              borderRadius: '8px',
              border: '1px solid #eee',
            }}
          >
            Join The Community
          </Button>
        </Stack>
      </Box>
      <img src={hero} alt="hero-section"></img>
    </Box>
  );
};

export default Header;
