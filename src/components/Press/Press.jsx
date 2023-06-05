import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import {
  techcabal,
  techcrunch,
  techpoint,
  mashable,
} from '../../assets/Images';

const Press = () => {
  return (
    <Box component="section" bgcolor="#F1FAD1" py="100px">
      <Stack gap="70px" width="85%" mx="auto">
        <Typography
          fontWeight="700"
          fontSize={{ xs: '24px', md: '40px' }}
          textAlign="center"
        >
          Check us out in the press.
        </Typography>
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          justifyContent="space-between"
          gap={{ xs: '20px' }}
          alignItems="center"
        >
          <img src={techpoint} alt="techpoint" />
          <img src={mashable} alt="mashable" />
          <img src={techcrunch} alt="techcrunch" />
          <img src={techcabal} alt="techcabal" />
        </Stack>
      </Stack>
    </Box>
  );
};

export default Press;
