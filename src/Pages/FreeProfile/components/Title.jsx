import React from 'react';
import { Typography } from '@mui/material';

export const Title = ({ children }) => {
  return (
    <Typography
      component="h1"
      fontWeight={700}
      fontSize="20px"
      color="text.grey.300"
    >
      {children}
    </Typography>
  );
};
