import React from 'react';
import { Typography } from '@mui/material';

const BankTranferDetails = ({ title, text }) => {
  return (
    <Typography
      component="p"
      variant="h6"
      color="text.grey.600"
      fontSize="16px"
      pb="2px"
      sx={{
        '& span': {
          color: 'text.grey.800',
        },
      }}
    >
      <span>{title}:</span> {text}
    </Typography>
  );
};

export default BankTranferDetails;
