import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { Process, Testimonials, TitleBanner } from '../../components';
import {
  timer,
  frontend,
  backend,
  cloud,
  bmagic,
  profile,
  teacher,
  jobPack,
} from '../../assets/Images';

const LaptopForDevelopers = () => {
  const processTitle = 'The step-by-step process';
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
    {
      icon: jobPack,
      title: 'Alumni Network',
      description:
        'Join our thriving Alumni Network and connect with fellow tech enthusiasts, industry professionals, and opportunities for growth in our program.',
    },
  ];
  return (
    <Box component="section">
      <TitleBanner title="Laptop4Developers" />
      <AboutProgram />
      <Process title={processTitle} process={process} />
      <Testimonials />
    </Box>
  );
};

export default LaptopForDevelopers;

export const AboutProgram = () => {
  return (
    <Box component="section" pt="40px" mx="auto" width="85%">
      <Stack gap="16px">
        <Typography
          component="h2"
          fontWeight="700"
          fontSize="20px"
          color="text.grey.200"
        >
          ABOUT THIS PROGRAM
        </Typography>
        <Typography
          component="h2"
          fontWeight="400"
          fontSize="20px"
          color="text.grey.700"
          lineHeight="43px"
        >
          The Laptop 4 Developers Program is a program by DevCareer that
          provides
          <Typography
            component="span"
            color="text.grey.800"
            fontWeight="600"
            fontSize="20px"
            mx="4px"
          >
            Laptops, Learning resources & Mentorship
          </Typography>
          to aspiring software developers, Designers and Tech enthusiasts who
          cannot afford them. The program is designed to help these enthusiasts
          overcome the financial entry barrier and give them the tools they need
          to kick off their careers.
        </Typography>
      </Stack>
      <Stack gap="16px" mt="40px" mb="60px">
        <Typography
          component="h2"
          fontWeight="700"
          fontSize="20px"
          color="text.grey.200"
        >
          PROGRAM DURATION
        </Typography>
        <Stack direction="row" alignItems="center" gap="16px">
          <img src={timer} alt="timer"></img>
          <Typography component="h2" fontSize="24px" color="text.grey.700">
            3 Months
          </Typography>
        </Stack>
      </Stack>
      <Skills />
      <AllInOneDiv />
    </Box>
  );
};

const Skills = () => {
  const skills = [
    {
      logo: frontend,
      text: 'Frontend Engineering',
    },
    {
      logo: backend,
      text: 'Backend Engineering',
    },
    {
      logo: bmagic,
      text: 'Product Design',
    },
    {
      logo: cloud,
      text: 'Cloud Engineering',
    },
  ];
  return (
    <Box>
      <Typography
        component="h2"
        fontWeight="700"
        fontSize="20px"
        color="text.grey.200"
        textAlign="center"
        mb="20px"
      >
        SKILLS
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns={{ xs: '1fr 1fr', md: 'repeat(4, 1fr)' }}
        gap={{ xs: '20px', md: '0px' }}
      >
        {skills.map((skill, i) => (
          <Stack alignItems="center" key={i}>
            <img src={skill.logo} alt={skill.text}></img>
            <Typography
              fontWeight="500"
              color="text.grey.700"
              fontSize="24px"
              width="50%"
              textAlign="center"
            >
              {skill.text}
            </Typography>
          </Stack>
        ))}
      </Box>
    </Box>
  );
};

const AllInOneDiv = () => {
  const stats = [
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
    <Stack
      display="grid"
      gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
      mt={{ xs: '70px', md: '140px' }}
      rowGap={{ xs: '20px' }}
    >
      <Box>
        <Typography color="text.black.100" fontWeight="700" fontSize="50px">
          All About Us in
        </Typography>
        <Typography color="primary.main" fontWeight="700" fontSize="50px">
          One Div
        </Typography>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        rowGap="10px"
        columnGap="20px"
      >
        {stats.map((stat, index) => (
          <Stack alignItems="center" direction="row" key={index} gap="8px">
            <Typography
              component="h3"
              fontSize="48px"
              fontWeight="700"
              color="primary.main"
            >
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
      </Box>
    </Stack>
  );
};
