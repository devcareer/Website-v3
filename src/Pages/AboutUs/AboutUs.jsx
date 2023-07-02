import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Card from './Card';
import {
  favour,
  joshua,
  soji,
  tobi,
  doyin,
  chidi,
  Ibukun,
  joyce,
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
            fontSize={{ xs: '20px', md: '18px' }}
            sx={{ color: (theme) => theme.palette.text.grey[600] }}
          >
            Meet The Team
          </Typography>
          <Typography
            component="h2"
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign={{ xs: 'center', md: 'left' }}
          >
            <Typography
              component="span"
              variant="h3"
              sx={{ fontWeight: 700 }}
              fontSize={{ xs: '36px', md: '48px' }}
              color="#181818"
            >
              Empowering African Tech Talents:
            </Typography>
            <Typography
              component="span"
              variant="h3"
              sx={{ fontWeight: 700 }}
              color="#181818"
              fontSize={{ xs: '38px', md: '48px' }}
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
          <Card image={joyce} name="Joyce Nwanochi" position="Programs" />
          <Card
            image={Ibukun}
            name="Ibukunoluwa Samuel"
            position="Operations"
          />
          <Card image={favour} name="Favour Chibueze" position="Community" />
          <Card image={joshua} name="Miebaka Joshua" position="Branding" />
          <Card image={soji} name="Olakunle Soji-Oke" position="Operations" />
          <Card image={tobi} name="Olagoke Tobi" position="Operations" />
          <Card image={doyin} name="Adedoyin" position="Grants" />
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
              fontSize={{ xs: '38px', md: '48px', lg: '56px' }}
              color="#181818"
              textAlign={{ xs: 'center', md: 'left' }}
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
              DevCareer takes a practical, hands-on approach to software
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
            gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)' }}
            alignItems="center"
            justifyItems="center"
            columnGap={{ xs: '42px', lg: '108px' }}
            rowGap="35px"
          >
            {partners.map((partner) => {
              return (
                <Box
                  key={partner.src}
                  component="img"
                  src={partner.src}
                  alt={partner.alt}
                  sx={{
                    maxWidth: partner.maxWidth ? partner.maxWidth : '100%',
                  }}
                />
              );
            })}
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
            fontSize={{ xs: '32px', lg: '64px' }}
            color="#FEFEFE"
            lineHeight={1.2}
            textAlign="center"
          >
            Join Hands with us as we make a change in the Tech World
          </Typography>
          <Button
            component={Link}
            to="/contact"
            variant="contained"
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

const partners = [
  { src: Wennovation, alt: 'wennovation' },
  { src: Creationhub, alt: 'creation hub' },
  { src: Swahilipot, alt: 'swahilipot' },
  { src: Kuda, alt: 'kuda' },
  {
    src: 'https://res.cloudinary.com/okoyecb/image/upload/v1688074852/ventures_q6vpxh.svg',
    alt: 'ventures',
  },
  {
    src: 'https://res.cloudinary.com/okoyecb/image/upload/v1688074852/Opolo_gbotlp.png',
    alt: 'opolo',
  },
  {
    src: 'https://res.cloudinary.com/okoyecb/image/upload/v1688074852/The_nest_lo084d.svg',
    alt: 'the nest',
  },
  {
    src: 'https://res.cloudinary.com/okoyecb/image/upload/v1688074852/The_cans_mogjuq.png',
    alt: 'the cans',
  },
  {
    src: 'https://res.cloudinary.com/okoyecb/image/upload/v1688074852/roothub-logo-1_rhgrkl.png',
    alt: 'roothub',
  },
  {
    src: 'https://res.cloudinary.com/okoyecb/image/upload/v1688074851/olotusq-logo-black-128_aajce5.png',
    alt: 'olotu square',
  },
  {
    src: 'https://res.cloudinary.com/okoyecb/image/upload/v1688074851/jacaranda_lzd8gh.webp',
    alt: 'jacaranda',
  },
  {
    src: 'https://res.cloudinary.com/okoyecb/image/upload/v1688074851/Group-10_vtr2ok.png',
    alt: 'group 10',
  },
  {
    src: 'https://res.cloudinary.com/okoyecb/image/upload/v1688074851/Educative_Logo_zdg9gr.jpg',
    alt: 'educative',
  },
  {
    src: 'https://res.cloudinary.com/okoyecb/image/upload/v1688074851/Ghana_Innovation_Hub_t8y97a.png',
    alt: 'ghana innovation hub',
  },
  {
    src: 'https://res.cloudinary.com/okoyecb/image/upload/v1688074850/doja_yjqqof.svg',
    alt: 'doja',
  },
  {
    src: 'https://res.cloudinary.com/okoyecb/image/upload/v1688074850/deimos_v52dq9.png',
    alt: 'deimos',
  },
  {
    src: 'https://res.cloudinary.com/okoyecb/image/upload/v1688074849/632ac9aada179418cfc68fc3_logo_1_d0rtm0.svg',
    alt: '632ac9aada179418cfc68fc3_logo_1',
  },
  {
    src: 'https://res.cloudinary.com/okoyecb/image/upload/v1688074849/62545220a86c7d6b63383de0_PledgesLogo_gakghu.svg',
    alt: 'pledges logo',
  },
  {
    src: 'https://res.cloudinary.com/okoyecb/image/upload/v1688074849/720logo_iunnyp.png',
    alt: 'logo 1',
  },
  {
    src: Eden,
    alt: 'eden',
    maxWidth: '150px',
  },
  {
    src: 'https://res.cloudinary.com/okoyecb/image/upload/v1688074850/bongohive-512x512_rbt5h9.png',
    alt: 'bongohive',
    maxWidth: '150px',
  },
];

export default AboutUs;
