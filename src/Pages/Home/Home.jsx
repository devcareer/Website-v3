import React from 'react';
import { Header } from '../../components';
import { Box, Typography } from '@mui/material';
import {
  revivn,
  peerigon,
  kuda,
  eden,
  isams,
  gofundme,
} from '../../assets/Images';

const Home = () => {
  return (
    <Box width="85%" mx="auto">
      <Header />
      <Sponsors />
    </Box>
  );
};

export default Home;

const Sponsors = () => {
  return (
    <>
      <Typography
        textAlign="center"
        fontWeight="600"
        fontSize="20px"
        mb="20px"
        color="text.grey.400"
        letterSpacing="8px"
      >
        PROUDLY SPONSORED BY
      </Typography>
      <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" rowGap="50px">
        <Box component="img" src={revivn}></Box>
        <Box component="img" src={gofundme}></Box>
        <Box component="img" src={isams} justifySelf="end"></Box>
        <Box component="img" src={kuda}></Box>
        <Box component="img" src={eden} justifySelf="center"></Box>
        <Box component="img" src={peerigon}></Box>
      </Box>
    </>
  );
};
