import { Box } from '@mui/material';
import React from 'react';
import { dev } from '../../assets/Images/index';

const AuthCard = (props) => {
  const { children } = props;
  return (
    // <Stack height="100vh" justifyContent="center">
    <Box
      width="90%"
      mx="auto"
      maxWidth="675px"
      // border="2px solid #E0E0E0"
      // px="20px"
      py="50px"
    >
      <Box component="img" src={dev} alt="logo"></Box>
      {children}
    </Box>
    // </Stack>
  );
};

export default AuthCard;
