import React from 'react';
import { Header, Press, Process, Testimonials } from '../../components';
import { Box, Stack, Typography } from '@mui/material';
import {
  revivn,
  peerigon,
  kuda,
  eden,
  isams,
  gofundme,
  mission,
  teacher,
  profile,
  jobPack,
} from '../../assets/Images';

const Home = () => {
  const processTitle =
    'Your journey of a thousand miles, starts with a one tweet pitch..';
  const process = [
    {
      icon: profile,
      title: 'Join Program',
      description:
        'Pass our four-level stage assessment and join DevCareer. Assessment will be based on several criteria; aptitude test, coding test and a physical interview.',
    },
    {
      icon: teacher,
      title: 'Resources & Mentors',
      description:
        'Get a laptop, get a course, get paired with a mentor in your field to support and progress your skill',
    },
    {
      icon: jobPack,
      title: 'Get Job Placements',
      description:
        'During and after your mentorship program, We will work together with your mentor to source for suitable jobs for you and prepare you for interviews',
    },
  ];
  return (
    <Box>
      <Header />
      <Sponsors />
      <Mission />
      <Process process={process} title={processTitle} />
      <Testimonials />
      <Press />
    </Box>
  );
};

export default Home;

const Sponsors = () => {
  return (
    <Box width="85%" mx="auto" pb={{ xs: '80px', md: '109px' }}>
      <Typography
        textAlign="center"
        fontWeight="600"
        fontSize={{ xs: '16px', md: '20px' }}
        mb="20px"
        color="text.grey.400"
        letterSpacing={{ xs: '4px', md: '8px' }}
      >
        PROUDLY SPONSORED BY
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr"
        rowGap="25px"
        columnGap={{ xs: '30px' }}
      >
        <Box component="img" src={kuda}></Box>
        <Box component="img" src={peerigon} alignSelf="center"></Box>
        <Box component="img" src={gofundme}></Box>
        <Box component="img" src={revivn}></Box>
        <Box
          component="img"
          src={isams}
          justifySelf="center"
          alignSelf="center"
        ></Box>
        <Box component="img" src={eden} justifySelf="center"></Box>
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
      <Stack
        width="85%"
        mx="auto"
        display="grid"
        gridTemplateColumns={{ xs: '1fr', lg: '1fr 1fr' }}
        gap={{ xs: '32px' }}
      >
        <Box
          component="img"
          src={mission}
          alt="mission"
          width={{ xs: '350px', sm: '70%', lg: 'auto' }}
        ></Box>

        <Stack direction="column">
          <Typography
            fontWeight="700"
            fontSize={{ xs: '40px', md: '50px' }}
            mb="32px"
            color="primary.main"
            fontFamily="Euclid"
          >
            Our Mission
          </Typography>
          <Stack component="ul" color="text.grey.300" pl="20px" gap="5px">
            {missions.map((mission, index) => (
              <Typography
                component="li"
                key={index}
                fontSize={{ xs: '16px', sm: '24px' }}
                fontFamily="Euclid"
              >
                {mission}
              </Typography>
            ))}
          </Stack>
          <Box
            display="grid"
            gridTemplateColumns="repeat(3, 1fr)"
            rowGap={{ xs: '20px', md: '36px' }}
            columnGap="20px"
            mt="60px"
          >
            {stats.map((stat, index) => (
              <Stack
                alignItems="center"
                direction={{ xs: 'column', md: 'row' }}
                key={index}
                gap={{ xs: '0px', md: '8px' }}
              >
                <Typography
                  component="h3"
                  fontSize={{ xs: '32px', md: '48px' }}
                  fontWeight="700"
                >
                  {stat.figure}
                </Typography>
                <Typography
                  component="p"
                  color="text.grey.500"
                  fontSize="16px"
                  fontWeight="400"
                  textAlign={{ xs: 'center', md: 'start' }}
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
