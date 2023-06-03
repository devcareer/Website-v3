import { Box, Container, Stack, Typography } from '@mui/material';
import { devcareerhub, uk, ukhub } from '../../assets/Images';
import {
  InstagramIcon,
  LinkedinIcon,
  SocialButton,
  TwitterIcon,
} from '../index';

const DpdsFooter = () => {
  return (
    <Container maxWidth="lg">
      <Typography
        variant="body1"
        color="initial"
        sx={{ color: '#888888', fontSize: '30px', fontWeight: '600' }}
      >
        About the UK-Nigeria Tech Hub
      </Typography>
      <Box sx={{width:"10%",display:"block"}}>
        <img src={uk} alt="uk" width={900}/>
      </Box>
      <Typography
        variant="body1"
        color="initial"
        sx={{ color: '#6D6D6D', fontSize: '20px', maxWidth:"1041px" }}
      >
        The UK-Nigeria Tech Hub is an initiative by the UK Government’s
        <Typography
          component="span"
          variant="body1"
          color="initial"
          sx={{ color: '#363636', fontWeight: '500', fontSize: '20px' }}
        >
          {' '}
          Department for Digital, Culture, Media, and Sports (DCMS){' '}
        </Typography>
        to support the growth of the technology ecosystem in Nigeria and works
        to stimulate local digital economies, support inclusive and sustainable
        economic growth and jobs, build high-end digital skills, and forge
        innovation partnerships between local tech firms and international
        businesses. UK-Nigeria Tech Hub is an initiative by the UK Government to
        support the growth of the Nigerian tech ecosystem.
      </Typography>
      <Typography
        variant="body1"
        color="initial"
        sx={{
          mt: '80px',
          color: '#888888',
          fontSize: '40px',
          fontWeight: '700',
          mb: '48px',
        }}
      >
        Contact{' '}
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ maxWidth: '826px', mx: 'auto', mb: '142px' }}
      >
        <Stack
          alignItems="center"
          sx={{
            border: '1px solid #E0E0E0',
            maxWidth: '496px',
            borderRadius: '8px',
            p: '16px',
          }}
        >
          <Box sx={{ width: '320px' }}>
            <img src={ukhub} alt="uk hub"  />
          </Box>
          <SocialButton text="@ukngtechhub" icon={<TwitterIcon />} />
          <SocialButton text="@ukngtechhub" icon={<InstagramIcon />} />
        </Stack>
        <Stack
          alignItems="center"
          sx={{
            border: '1px solid #E0E0E0',
            maxWidth: '496px',
            borderRadius: '8px',
            p: '16px',
          }}
        >
          <Box>
            <img src={devcareerhub} alt="devcareer"  />
          </Box>
          <SocialButton text="@dev_careers" icon={<TwitterIcon />} />
          <SocialButton text="DevCareer" icon={<LinkedinIcon />} />
        </Stack>
      </Stack>
    </Container>
  );
};

export default DpdsFooter;
