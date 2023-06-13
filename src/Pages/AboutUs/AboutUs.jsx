import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import Card from './Card';
import {
  favour,
  joshua,
  soji,
  tobi,
  doyin,
  chidi,
  learning,
  Wennovation,
  Swahilipot,
  Creationhub,
  Kuda,
  Eden,
  background,
} from '../../assets/Images';

const AboutUs = () => {
  return (
    <Container maxWidth="false" disableGutters>
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb="73px"
        >
          <Typography
            component="h1"
            variant="body1"
            mb={1}
            sx={{ color: (theme) => theme.palette.text.grey[600] }}
          >
            Meet The Team
          </Typography>
          <Typography
            component="h2"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography
              component="span"
              variant="h3"
              sx={{ fontWeight: 700 }}
              color="#181818"
            >
              Empowering African Tech Talents:
            </Typography>
            <Typography
              component="span"
              variant="h3"
              sx={{ fontWeight: 700 }}
              color="#181818"
            >
              Our Passionate Professionals
            </Typography>
          </Typography>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            lg: 'repeat(4, 1fr)',
          }}
          columnGap="25px"
          rowGap="16px"
          justifyItems="center"
        >
          <Card image={favour} name="Favour Ch" position="community" />
          <Card image={joshua} name="Miebaka Joshua" position="Branding" />
          <Card image={soji} name="Olakunle Soji-Oke" position="Operations" />
          <Card image={tobi} name="Olagoke Tobi" position="Operations" />
          <Card image={doyin} name="Adedoyin" position="Grants" />
          <Card image={chidi} name="Chidi Okoye" position="Programs" />
          <Card image={tobi} name="Olagoke Tobi" position="Operations" />
          <Card image={chidi} name="Chidi Okoye" position="Programs" />
        </Box>
      </Container>
      <Container maxWidth="false" sx={{ mt: '56px' }} disableGutters>
        <Container>
          <Box>
            <Typography
              component="h3"
              variant="h2"
              fontWeight={700}
              fontSize={{ xs: '56px', sm: '60px', lg: '64px' }}
              color="#181818"
            >
              Our Approach
            </Typography>
            <Typography
              component="h4"
              fontWeight={400}
              fontSize={{ xs: '20px', lg: '24px' }}
              mt="24px"
              sx={{ color: (theme) => theme.palette.text.grey[700] }}
            >
              DevCareer.io takes a practical, hands-on approach to software
              development education. Our programs offer real-world projects and
              challenges, teaching in-demand programming languages, frameworks,
              and tools. We provide mentors who guide and support students
              throughout their journey, offering insights and career advice.
            </Typography>
          </Box>
        </Container>
        <Box
          component="img"
          src={learning}
          alt="learning"
          width="100%"
          mt="55px"
        />
      </Container>
      <Container sx={{ mt: { xs: '60px', lg: '120px' } }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography
            fontSize="24px"
            sx={{ color: (theme) => theme.palette.text.grey[600] }}
            mb="48px"
          >
            Our Global Partners
          </Typography>
          <Box
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
            alignItems="center"
            columnGap={{ xs: '76px', lg: '108px' }}
            rowGap="35px"
          >
            <Box src={Wennovation} component="img" alt="learning" />
            <Box src={Creationhub} component="img" alt="learning" />
            <Box
              order={{ xs: 1, lg: 0 }}
              component="img"
              src={Eden}
              alt="learning"
              alignSelf={{ lg: 'center' }}
              gridRow={{ lg: 'span 2' }}
              maxWidth={{ xs: '100%', lg: '200px' }}
            />
            <Box src={Swahilipot} component="img" alt="learning" />
            <Box src={Kuda} component="img" alt="learning" />
          </Box>
        </Box>
      </Container>
      <Container
        sx={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          pb: '73px',
          mt: { xs: '60px', lg: '132px' },
        }}
        maxWidth="false"
      >
        <Container
          sx={{
            pt: '72px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            fontWeight={700}
            fontSize={{ xs: '52px', lg: '64px' }}
            color="#FEFEFE"
            lineHeight={1.2}
            textAlign="center"
          >
            Join Hands with us as we make a change in the Tech World
          </Typography>
          <Button
            sx={{
              bgcolor: '#FEFEFE',
              width: '100%',
              maxWidth: '440px',
              py: '24px',
              color: '#037B62',
              mt: '83px',
              borderRadius: '8px',
              fontSize: '16px',
              '&:hover': {
                bgcolor: '#FEFEFE',
                color: '#037B62',
              },
            }}
          >
            Become A Partner
          </Button>
        </Container>
      </Container>
    </Container>
  );
};

// const StyledTypography = styled(Typography)`
//     font-weight: 700;
// `;

export default AboutUs;
