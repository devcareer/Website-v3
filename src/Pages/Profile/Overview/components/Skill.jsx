import React from 'react';
import { Box } from '@mui/material';

export const Skill = ({ skill }) => {
  return (
    <Box
      backgroundColor="#F4F4F4"
      display="inline-block"
      color="text.grey.700"
      fontSize="16px"
      fontWeight={400}
      borderRadius="8px"
      py="4px"
      px="8px"
    >
      {skill}
    </Box>
  );
};
