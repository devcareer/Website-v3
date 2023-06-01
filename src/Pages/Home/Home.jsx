import React from 'react';
import { Header } from '../../components';
import { Box, Stack, Typography } from '@mui/material';
import {
  revivn,
  peerigon,
  kuda,
  eden,
  isams,
  gofundme,
  mission,
} from '../../assets/Images';

const Home = () => {
  return (
    <Box>
      <Header />
      <Sponsors />
      <Mission />
    </Box>
  );
};

export default Home;

const Sponsors = () => {
  return (
    <Box width="85%" mx="auto" pb="109px">
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
    </Box>
  );
};

const Mission = () => {
  const missions = [
    'Create world class Tech Talents',
    'Solve problems in Africa with Tech',
    'Create employment and breed innovative ideas',
    'Build more positive tech savvy youths',
    'Support females into tech in Africa',
  ];
  const stats = [
    {
      figure: '18k+',
      text: 'Community Members',
    },
    {
      figure: '150+',
      text: 'Trained Talents',
    },
    {
      figure: '20+',
      text: 'Mentors',
    },
    {
      figure: '15+',
      text: 'Partners & Sponsors',
    },
    {
      figure: '48',
      text: 'Patrons',
    },
  ];
  return (
    <Box bgcolor="#F6F6F6" py="130px" mb="30px">
      <Stack width="85%" mx="auto" display="grid" gridTemplateColumns="1fr 1fr">
        <Box component="img" src={mission}></Box>
        <Stack direction="column">
          <Typography
            fontWeight="700"
            fontSize="64px"
            mb="32px"
            color="primary.main"
          >
            Our Mission
          </Typography>
          <Stack component="ul" color="text.grey.300" pl="20px" gap="5px">
            {missions.map((mission, index) => (
              <Typography component="li" key={index} fontSize="24px">
                {mission}
              </Typography>
            ))}
          </Stack>
          <Box
            display="grid"
            gridTemplateColumns="repeat(3, 1fr)"
            rowGap="36px"
            mt="60px"
          >
            {stats.map((stat, index) => (
              <Stack alignItems="center" direction="row" key={index} gap="8px">
                <Typography component="h3" fontSize="48px" fontWeight="700">
                  {stat.figure}
                </Typography>
                <Typography
                  component="p"
                  color="text.grey.500"
                  fontSize="20px"
                  fontWeight="400"
                >
                  {stat.text}
                </Typography>
              </Stack>
            ))}
            <Typography
              justifySelf="center"
              alignSelf="center"
              color="text.grey.500"
            >
              ...and counting!
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
