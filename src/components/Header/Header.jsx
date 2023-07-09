import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { hero } from '../../assets/Images';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{ xs: '1fr', lg: '1fr 1fr' }}
      pt={{ xs: '0px', md: '24px' }}
      pb="128px"
      gap="40px"
      className="container"
      sx={{
        animation: 'herosection 2s forwards',
      }}
    >
      <Box pt={{ xs: '0px', lg: '36px' }}>
        <Typography
          color="misc.100"
          fontSize={{ xs: '50px', sm: '72px' }}
          fontWeight="700"
          lineHeight={{ xs: '70px', sm: '80px' }}
          fontFamily="Euclid"
        >
          Fast-Track Your Tech Career
        </Typography>
        <Typography
          color="text.grey.500"
          fontSize={{ xs: '18px', md: '20px' }}
          fontWeight="400"
          mt="32px"
          mb="60px"
          fontFamily="Euclid"
        >
          Our mission is to support individuals seeking to enter the tech field
          by helping them overcome the challenge of selecting a programming
          specialization and offering valuable learning tools.
        </Typography>
        <Stack
          direction={{ xs: 'column-reverse', sm: 'row' }}
          gap={{ xs: '20px', md: '40px' }}
        >
          <Link to="/auth?mode=signup" style={{ flexBasis: '40%' }}>
            <Button
              fontWeight="500"
              fontSize="20px"
              variant="outlined"
              sx={{
                width: '100%',
                py: { xs: '15px', md: '20px' },
                borderRadius: '8px',
                color: { xs: '#FEFEFE', sm: 'primary.main' },
                bgcolor: { xs: 'primary.main', sm: 'inherit' },
                animation: 'resume 3s forwards',
                // opacity: 0,
                // transform: 'translateX(100%)',
              }}
            >
              Create Mini-CV
              {/* <Link
              to="/auth?mode=signup"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
            </Link> */}
            </Button>
          </Link>
          <Button
            component="a"
            target="_blank"
            href="https://docs.google.com/forms/d/e/1FAIpQLSfdp21O60omVRDUGReslAAbwQeAXLeRasvL3G6S-VN8qbt2gg/viewform"
            fontWeight="500"
            fontSize="20px"
            // variant="outlined"
            sx={{
              py: { xs: '15px', md: '20px' },
              flexBasis: '40%',
              color: '#037B62',
              borderRadius: '8px',
              border: '1px solid #eee',
              animation: 'community 2s forwards',
            }}
          >
            Join The Community
          </Button>
        </Stack>
      </Box>
      <Box
        component="img"
        src={hero}
        alt="hero-section"
        display={{ xs: 'none', lg: 'block' }}
      ></Box>
    </Box>
  );
};

export default Header;
