import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { success } from '../../assets/Images';

const SuccessModal = () => {
  return (
    <Stack>
      <Box
        className="overlay"
        bgcolor="rgba(0,0,0,0.5)"
        position="fixed"
        top="0"
        left="0"
        width="100vw"
        height="100vh"
      ></Box>
      <Stack
        zIndex="4"
        className="modal"
        alignItems="center"
        gap="20px"
        position="fixed"
        top="15%"
        left="50%"
        py={{ xs: '20px', md: '40px' }}
        px={{ xs: '20px', md: '40px' }}
        width={{ xs: '280px', md: '486px' }}
        sx={{ transform: 'translateX(-50%)' }}
        bgcolor="primary.main"
        borderRadius="15px"
      >
        <Typography
          color="#FFF"
          fontSize={{ xs: '16px', md: '20px' }}
          fontWeight="500"
        >
          Great Job!
        </Typography>
        <img src={success} alt="Success modal illustration"></img>
        <Typography
          color="#FFF"
          fontSize={{ xs: '16px', md: '20px' }}
          fontWeight="500"
        >
          Your registration was successful
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SuccessModal;
