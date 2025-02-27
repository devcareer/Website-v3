import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import {
  techcabal,
  technext,
  techpoint,
  businessday,
} from '../../assets/Images';
import { Link } from 'react-router-dom';
const Press = () => {
  return (
    <Box component="section" bgcolor="#d3f1db" py="100px">
      <Stack gap="70px" className="container">
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
          <Link
            to="https://techpoint.africa/2019/09/12/devcareer-helping-upcoming-nigerian-developers/ "
            target="_blank"
          >
            <img src={techpoint} alt="techpoint" />
          </Link>
          <Link
            to="https://businessday.ng/technology/article/devcareer-secures-100000-grant-to-support-upcoming-african-developers/"
            target="_blank"
          >
            <Box
              component="img"
              src={businessday}
              alt="business day"
              height="90px"
              width="90px"
              sx={{ mixBlendMode: 'darken' }}
            ></Box>
          </Link>

          <Link
            to="https://technext24.com/2022/04/13/devcareer-raises-100k-for-laptops4developers-3/"
            target="_blank"
          >
            <img src={technext} alt="technext" height="90px" width="90px" />
          </Link>
          <Link
            to="https://techcabal.com/2020/02/20/devcareer-6000-funding-jack-dorsey/"
            target="_blank"
          >
            <img src={techcabal} alt="techcabal" />
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Press;
