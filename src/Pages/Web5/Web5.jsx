import React from 'react';
import { TitleBanner } from '../../components';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { TBD, timer } from '../../assets/Images';
import { Image } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Web5 = () => {
  return (
    <>
      <TitleBanner
        title="Web 5 Hackathon"
        text="(In Partnership with TBD)"
        subtext="Virtual"
      />
      <AboutProgram />
      <Sponsor />
    </>
  );
};

export default Web5;

const AboutProgram = () => {
  const STEPS = [
    'Complete the Hackathon Application Form',
    'Application Review',
    'Collaborate with Your Team on an Area of Focus',
    'Project Submission within the Stipulated Timeline',
  ];
  const TIMELINE = [
    {
      week: 'One',
      info: 'Participants will engage in a comprehensive learning experience about Web 5 technologies. The week will include webinars, workshops, and presentations by industry experts and speakers.',
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
          color: '#6D6D6D',
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
        <Typography component="p" fontSize={{ xs: '16px', md: '20px' }}>
          The Devcareer Web5 Hackathon is a four-weeks Web 5 in combination with
          blockchain technology and cryptocurrencies event that aims to
          encourage participants to interact, learn, and build using Web 5
          Technologies. The hackathon will be divided into three phases:
          Learning, Writing, and Building. Each phase will focus on specific
          activities that will lead participants towards developing innovative
          solutions using Web 5 technologies.
        </Typography>
      </Stack>
      <Stack>
        <Typography
          component="h2"
          fontSize={{ xs: '20px', md: '24px' }}
          color="text.black.100"
          fontWeight="700"
        >
          HACKATHON BREAKDOWN
        </Typography>
        <Stack component="ul" pl="20px">
          {STEPS.map((step, i) => (
            <Typography
              key={i}
              component="li"
              color="grey.700"
              fontSize={{ xs: '16px', md: '20px' }}
            >
              <Typography
                component="span"
                fontWeight="700"
                color="grey.800"
                fontSize={{ xs: '16px', md: '20px' }}
              >
                {`Step ${i + 1}:`}{' '}
              </Typography>
              {step}
            </Typography>
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
          <img src={timer} alt="timer" />
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
          columnGap="64px"
          rowGap={{ xs: '30px', md: '60px' }}
        >
          {TIMELINE.map((data, i) => (
            <Stack
              gap={{ xs: '16px', md: '20px' }}
              key={i}
              mt={i === 2 ? { md: '-120px' } : '0'}
            >
              <Typography
                component="h2"
                fontWeight="700"
                fontSize={{ xs: '20px', md: '30px' }}
                color="#212121"
              >
                {`Week ${data.week}`}
              </Typography>
              <Typography fontSize={{ xs: '16px', md: '20px' }}>
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
            <Typography component="li" fontSize={{ xs: '16px', md: '20px' }}>
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
    <Stack
      className="container"
      alignItems="center"
      mt={{ xs: '70px', md: '155px' }}
      mb={{ xs: '70px', md: '155px' }}
    >
      <Button
        sx={{
          color: 'white',
          py: { xs: '16px', md: '20px' },
          width: '100%',
          maxWidth: '600px',
          fontWeight: '700',
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
        believes in a decentralized future that returns ownership and control
        over your finances, data, and identity. Guided by this vision, TBD is
        building infrastructure that enables everyone to access and participate
        in the global economy.
      </Typography>
      <Typography fontSize={{ xs: '16px', md: '20px' }} color="text.grey.700">
        <Typography
          fontWeight="700"
          component="span"
          fontSize={{ xs: '16px', md: '20px' }}
        >
          TBD{' '}
        </Typography>
        invites the world to join them in building and adopting open and
        decentralized technologies that solve real problems for real people.
        Their mission advances economic empowerment around the globe through the
        power of decentralised solutions, built open source and collaboratively.
      </Typography>
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
