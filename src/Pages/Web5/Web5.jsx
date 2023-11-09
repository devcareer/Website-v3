import React from 'react';
import { TitleBanner } from '../../components';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import {
  TBD,
  tbdLines,
  timer,
  yellowTimer,
  tbdBlack,
  tbdYellow,
  timeline,
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
} from '../../assets/Images';
import { Image } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Web5 = () => {
  return (
    <Box
      className="web5"
      position="relative"
      sx={{
        backgroundImage: `url(${timeline})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '100% 60%',
      }}
    >
      <TbdTitleBanner />
      <AboutProgram />
      <Sponsor />
      <Box
        component="img"
        src={tbdBlack}
        position="absolute"
        top="0%"
        left="0"
        zIndex="-2"
      ></Box>
      <Box
        component="img"
        src={tbdYellow}
        position="absolute"
        bottom="4%"
        left="0"
        zIndex="-2"
      ></Box>
    </Box>
  );
};

export default Web5;

const AboutProgram = () => {
  const STEPS = [StepOne, StepTwo, StepThree, StepFour];
  const TIMELINE = [
    {
      week: 'One',
      info: 'Participants will engage in a comprehensive learning experience about Web 5 technologies. The week will include webinars, and presentations by industry experts and speakers.',
    },
    {
      week: 'Two',
      info: `Participants need to create teams of up to four members, including at least one female member. They'll receive Web 5 technology topics to write well-researched, informative articles demonstrating their understanding of Week 1's content. These articles are due by the end of Day 14 and will be judged for quality, originality, and clarity by a panel of experts.`,
    },
    {
      week: 'Three',
      info: `Teams will be presented with the main challenge of the hackathon, involving the creation of inventive solutions using Web 5 technologies. Participants can opt to develop web applications, dApps, or any imaginative projects that highlight the capabilities of Web 5.`,
    },
    {
      week: 'Four',
      info: `Participants will submit their projects, which will be reviewed by experts to evaluate their quality and adherence to criteria. The week will culminate in a prize-giving ceremony to recognize and reward outstanding contributions to the event.`,
    },
  ];
  const PRIZES = [
    'Over $30,000',
    'Scholarships',
    'Swags',
    'Access to Resources',
  ];
  return (
    <Stack
      gap="40px"
      component="section"
      className="container"
      mt={{ xs: '60px', md: '102px' }}
      sx={{
        p: {
          color: '#363636',
        },
      }}
    >
      <Stack>
        <Typography
          component="h2"
          fontSize={{ xs: '20px', md: '24px' }}
          color="text.black.100"
          fontWeight="700"
        >
          ABOUT THIS PROGRAM
        </Typography>
        <Typography fontSize={{ xs: '16px', md: '20px' }}>
          The Devcareer Web5 Hackathon is a four-weeks Web 5 in combination with
          blockchain technology and cryptocurrencies event that aims to
          encourage participants to interact, learn, and build using Web 5
          Technologies. The hackathon will be divided into three phases:{' '}
          <Typography
            fontWeight="700"
            component="span"
            fontSize={{ xs: '16px', md: '20px' }}
          >
            Learning, Writing, and Building.{' '}
          </Typography>
          Each phase will focus on specific activities that will lead
          participants towards developing innovative solutions using Web 5
          technologies.
        </Typography>
      </Stack>
      <Stack>
        <Typography
          component="h2"
          fontSize={{ xs: '20px', md: '24px' }}
          color="text.black.100"
          fontWeight="700"
          textAlign={{ xs: 'center', md: 'start' }}
          mb="12px"
        >
          HACKATHON BREAKDOWN
        </Typography>
        <Stack
          component="ul"
          pl="20px"
          direction={{ md: 'row' }}
          gap={{ xs: '24px', md: '10px' }}
          alignItems="center"
          flexWrap="wrap"
        >
          {STEPS.map((step, i) => (
            <Box
              component="img"
              src={step}
              key={i}
              width={{ xs: '300px', md: 'auto' }}
            ></Box>
            // <Typography
            //   key={i}
            //   component="li"
            //   color="grey.700"
            //   fontSize={{ xs: '16px', md: '20px' }}
            // >
            //   <Typography
            //     component="span"
            //     fontWeight="700"
            //     color="grey.800"
            //     fontSize={{ xs: '16px', md: '20px' }}
            //   >
            //     {`Step ${i + 1}:`}{' '}
            //   </Typography>
            //   {step}
            // </Typography>
          ))}
        </Stack>
      </Stack>
      <Stack alignItems={{ xs: 'center', md: 'start' }}>
        <Typography
          component="h2"
          fontSize={{ xs: '20px', md: '24px' }}
          color="text.black.100"
          fontWeight="700"
        >
          PROGRAM DURATION
        </Typography>
        <Stack direction="row" alignItems="center" gap="16px">
          <img src={yellowTimer} alt="timer" />
          <Typography
            component="h2"
            fontSize={{ xs: '16px', md: '24px' }}
            color="text.grey.700"
          >
            1 Month
          </Typography>
        </Stack>
      </Stack>
      <Stack>
        <Typography
          component="h2"
          fontSize={{ xs: '20px', md: '24px' }}
          color="text.black.100"
          fontWeight="700"
        >
          TIMELINE
        </Typography>
        <Grid
          display="grid"
          gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
          gap={{ xs: '24px', md: '36px' }}
        >
          {TIMELINE.map((data, i) => (
            <Stack
              gap={{ xs: '16px', md: '20px' }}
              key={i}
              bgcolor="yellow.100"
              px="16px"
              py="24px"
              border="2px solid #000"
            >
              <Typography
                component="li"
                fontWeight="700"
                fontSize={{ xs: '20px', md: '30px' }}
                color="#181818"
              >
                {`Week ${data.week}`}
              </Typography>
              <Typography
                fontSize={{ xs: '16px', md: '20px' }}
                color="text.grey.800"
              >
                {data.info}
              </Typography>
            </Stack>
          ))}
        </Grid>
      </Stack>
      <Stack>
        <Typography
          component="h2"
          fontSize={{ xs: '20px', md: '24px' }}
          color="text.black.100"
          fontWeight="700"
        >
          PRIZES TO BE WON
        </Typography>
        <Stack component="ul" pl="20px">
          {PRIZES.map((prize, i) => (
            <Typography
              key={i}
              component="li"
              fontSize={{ xs: '16px', md: '20px' }}
            >
              {prize}
            </Typography>
          ))}
        </Stack>
      </Stack>
      <Typography
        component="h2"
        fontSize={{ xs: '20px', md: '24px' }}
        color="text.black.100"
        fontWeight="700"
      >
        Application deadline: November 18th, 2023.
      </Typography>
    </Stack>
  );
};

const Sponsor = () => {
  const navigate = useNavigate();
  return (
    <Stack alignItems="center" mt={{ xs: '70px', md: '155px' }}>
      <Button
        sx={{
          color: 'text.primary',
          bgcolor: 'yellow.200',
          py: { xs: '16px', md: '20px' },
          width: '80%',
          maxWidth: '600px',
          fontWeight: '700',
          borderRadius: '0',
          boxShadow: 'none',
          borderLeft: '1px solid #000',
          borderRight: '4px solid #000',
          borderBottom: '4px solid #000',
          borderTop: '1px solid #000',
          ':hover': {
            transform: 'scale(0.9)',
            // opacity: '0.7',
            bgcolor: 'yellow.200',
          },
        }}
        variant="contained"
        onClick={() => navigate('registration')}
      >
        Proceed with Application
      </Button>
      <Typography
        component="h2"
        fontSize={{ xs: '26px', md: '32px' }}
        color="grey.600"
        fontWeight="700"
        mt="72px"
        mb="32px"
      >
        MEET THE SPONSOR
      </Typography>
      <img src={TBD} alt="TBD logo" />
      <Stack
        width="100%"
        py="50px"
        bgcolor="yellow.200"
        sx={{
          'p, span': {
            color: '#363636',
          },
        }}
      >
        <Box className="container">
          <Typography
            fontSize={{ xs: '16px', md: '20px' }}
            color="text.grey.700"
            mt="40px"
            mb="15px"
          >
            <Typography
              fontWeight="700"
              component="span"
              fontSize={{ xs: '16px', md: '20px' }}
            >
              TBD{' '}
            </Typography>
            believes in a decentralized future that returns ownership and
            control over your finances, data, and identity. Guided by this
            vision, TBD is building infrastructure that enables everyone to
            access and participate in the global economy.
          </Typography>
          <Typography
            fontSize={{ xs: '16px', md: '20px' }}
            color="text.grey.700"
          >
            <Typography
              fontWeight="700"
              component="span"
              fontSize={{ xs: '16px', md: '20px' }}
            >
              TBD{' '}
            </Typography>
            invites the world to join them in building and adopting open and
            decentralized technologies that solve real problems for real people.
            Their mission advances economic empowerment around the globe through
            the power of decentralised solutions, built open source and
            collaboratively.
          </Typography>
        </Box>
      </Stack>
    </Stack>
  );
};
{
  /* <Button
  disabled
  onClick={() => navigate('/programs/dpds/registration')}
  variant="contained"
  disableElevation
  sx={{
    borderRadius: '8px',
    maxWidth: '600px',
    color: 'white',
    width: '100%',
    paddingBlock: { xs: '15px', lg: '20px' },
    fontSize: { xs: '16px', lg: '18px' },
  }}
>
  Enroll into Program
</Button>; */
}

const TbdTitleBanner = () => {
  return (
    <Stack
      position="relative"
      bgcolor="text.black.100"
      sx={{
        backgroundImage: { lg: `url(${tbdLines})` },
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '100% 0',
      }}
      py={{ xs: '16px', md: '32px' }}
    >
      <Stack
        width="85%"
        mx="auto"
        direction="row"
        justifyContent="space-between"
      >
        <Box
          sx={{
            'p, h2': {
              color: 'yellow.200',
            },
          }}
        >
          <Typography
            component="h2"
            fontSize={{ xs: '16px', md: '35px', lg: '40px', xl: '55px' }}
            fontWeight="700"
          >
            WEB 5 HACAKATHON
          </Typography>
          <Typography
            fontSize={{ xs: '16px', md: '35px', lg: '40px', xl: '55px' }}
            fontWeight="500"
            mt={{ md: '-16px' }}
          >
            (In Partnership with TBD)
          </Typography>
          <Typography
            fontStyle="italic"
            fontSize={{ xs: '16px', md: '36px' }}
            mt={{ md: '-16px' }}
          >
            Virtual
          </Typography>
        </Box>
        <Box
          display={{ xs: 'none', lg: 'block' }}
          component="img"
          src={TBD}
          alt="tbd logo"
          sx={{
            height: '147px',
            width: '296px',
          }}
        />
      </Stack>
    </Stack>
  );
};
