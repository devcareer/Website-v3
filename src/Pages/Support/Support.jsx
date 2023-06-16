import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { donation } from '../../assets/Images';
import SupportCard from './SupportCard';
import SupportDonateCard from './SupportDonateCard';
import { patreon, Gofundme, resources, donate } from '../../assets/Images';

const Support = () => {
  return (
    <Container maxWidth="false" disableGutters sx={{ pb: '61px' }}>
      <Container
        sx={{
          backgroundImage: `url(${donation})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        maxWidth="false"
        disableGutters
      >
        <Container
          sx={{
            pt: { xs: '80px', lg: '220px' },
            pb: { xs: '100px', lg: '220px' },
          }}
        >
          <Typography
            component="h1"
            fontWeight={700}
            fontSize={{ xs: '48px', lg: '56px' }}
            color="#FEFEFE"
            display="flex"
            flexDirection="column"
          >
            <Typography component="span" sx={{fontSize:{xs:"40px",lg:"56px"} ,font: 'inherit' }}>
              Support our Mission of
            </Typography>
            <Typography component="span" sx={{fontSize:{xs:"40px",lg:"56px"}, font: 'inherit' }}>
              Accessibility and Opportunity
            </Typography>
          </Typography>

          <Button
            variant="contained"
            sx={{
              width: '100%',
              maxWidth: '440px',
              py: '24px',
              color: '#FEFEFE',
              mt: '83px',
              borderRadius: '8px',
              fontSize: '16px',
              textTransform: 'capitalize',
            }}
          >
            Donate Now
          </Button>
        </Container>
      </Container>
      <Container>
        <Typography
          component="h1"
          variant="body1"
          fontSize={{ xs: '20px', md: '18px' }}
          sx={{ color: (theme) => theme.palette.text.grey[600] }}
          mt="56px"
        >
          Unlock the Potential of Aspiring Techies
        </Typography>
        <Typography
          component="h2"
          variant="h2"
          fontWeight={700}
          fontSize={{ xs: '40px', md: '56px' }}
          sx={{ mt: '8px' }}
          color="#181818"
        >
          How to Support DevCareer
        </Typography>
        <Box maxWidth="908px">
          <Typography
            fontSize={{ xs: '18px', md: '20px' }}
            sx={{ color: (theme) => theme.palette.text.grey[700], mt: '32px' }}
          >
            At DevCareer.io, we're on a mission to level the playing field for
            aspiring developers. Your support helps us provide accessible tech
            education through coding courses, mentorship, and career guidance.
          </Typography>
          <Typography
            fontSize={{ xs: '18px', lg: '20px' }}
            sx={{ color: (theme) => theme.palette.text.grey[700], mt: '32px' }}
          >
            Together, let's unlock their potential and create lasting change.
            Donate today to empower dreams!
          </Typography>
        </Box>
      </Container>
      <Container sx={{ mt: '53px' }}>
        <Box
          display={{ xs: 'grid' }}
          gridTemplateColumns={{ md: 'repeat(2, 1fr)' }}
          gap="23px"
          justifyItems={{ xs: 'center', lg: 'stretch' }}
        >
          <SupportDonateCard
            image={donate}
            title="Make A Donation Today"
            text="Your contribution fuels dreams and transforms lives. Donate now and make a lasting impact.
                                             "
            btntxt="Donate now"
          />
          <SupportCard
            image={patreon}
            text="Your contribution fuels dreams and transforms lives. Donate now and make a lasting impact.
                                             Your contribution fuels dreams and transforms lives. Donate now and make a lasting impact."
            btntxt="Become Patreon"
            link="https://www.patreon.com/devcareer"
          />
          <SupportCard
            image={Gofundme}
            text="Your contribution fuels dreams and transforms lives. Donate now and make a lasting impact.
                                             Your contribution fuels dreams and transforms lives. Donate now and make a lasting impact."
            btntxt="Donate With GoFundMe"
            link="https://www.gofundme.com/f/vrz6p8-laptops4developers"
          />
          <SupportCard
            image={resources}
            text="Your contribution fuels dreams and transforms lives. Donate now and make a lasting impact.
                                         Your contribution fuels dreams and transforms lives. Donate now and make a lasting impact."
            btntxt="Contact Us"
            link="mailto:support@devcareer.io"
          />
        </Box>
      </Container>
    </Container>
  );
};

export default Support;
