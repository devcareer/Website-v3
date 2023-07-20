import React from 'react';
import { Box, Typography } from '@mui/material';
import { Title } from './components/Title';
import { Skill } from './components/Skill';

const Overview = () => {
  return (
    <Box
      width="90%"
      py="48px"
      px="120px"
      maxWidth="1018px"
      mx="auto"
      backgroundColor="#FEFEFE"
      mt="48px"
    >
      <Box>
        <Title>Adekanbi Julius Asaolu</Title>
        <Typography
          component="h2"
          variant="subtitle1"
          color="text.grey.300"
          fontWeight={500}
          fontSize="16px"
        >
          Product Designer
        </Typography>
        <Typography
          component="h3"
          variant="subtitle2"
          color="text.grey.700"
          fontWeight={400}
          fontSize="16px"
        >
          adevikthur.xyz
        </Typography>
      </Box>
      <Box mt="28px">
        <Title>About</Title>
        <Typography
          component="h2"
          variant="body2"
          color="text.grey.300"
          fontWeight={400}
          fontSize="16px"
          mt="8px"
        >
          With over 3 years of experience in brand identity, illustration, and
          Product Design, I specialize in creating aesthetically pleasing and
          usable products for various industries. My focus is on transforming
          complex technology into straightforward, user-friendly solutions.
        </Typography>
      </Box>
      <Box mt="28px">
        <Title>Skills</Title>
        <Box display="flex" columnGap="20px">
          <Skill skill="CSS" />
          <Skill skill="HTML" />
          <Skill skill="JavaScript" />
          <Skill skill="VueJs" />
          <Skill skill="Figma" />
        </Box>
      </Box>
    </Box>
  );
};

export default Overview;
