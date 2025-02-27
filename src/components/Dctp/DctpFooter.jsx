import { Box, Stack, Typography } from '@mui/material';
import { devcareerhub, uk, ukhub } from '../../assets/Images';
import {
  InstagramIcon,
  LinkedinIcon,
  SocialButton,
  TwitterIcon,
} from '../index';

const DctpFooter = () => {
  return (<Box
     sx={{ width: { xs: '90%', lg: '85%' },maxWidth:{xl:"1200px"}, mx: 'auto' }}>
      <Typography
        variant="body1"
        color="initial"
        textAlign={{xs:"center",lg:"left"}}
        sx={{
          color: '#888888',
          fontSize: { xs: '18px', md: '20px', lg: '30px' },
          fontWeight: '600',
        }}
      >
        About the UK-Nigeria Tech Hub
      </Typography>
      <Box sx={{ display: 'block' }}>
        <img src={uk} alt="uk" width="900px" />
      </Box>
      <Typography
        variant="body1"
        color="initial"
        
        sx={{ color: '#6D6D6D', fontSize:{xs:"16px",lg:"20px"}, maxWidth: '1041px' }}
      >
        The UK-Nigeria Tech Hub is an initiative by the UK Government’s
        <Typography
          component="span"
          variant="body1"
          color="initial"
          sx={{ color: '#363636', fontWeight: '500', fontSize:{xs:"16px",lg:"20px"} }}
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
        textAlign={{xs:"center",lg:"left"}}
        sx={{
          mt:{xs:"40px",lg:"80px"},
          color: '#888888',
          fontSize:{xs:"25px",lg:"40px"},
          fontWeight: '700',
          mb: {xs:"24px",lg:"49px"} ,
        }}
      >
        Contact{' '}
      </Typography>
      <Stack
        direction={{xs:"column",md:"row"}}
        justifyContent={{md:"center",lg:"space-between"}}
        alignItems="center"
        gap={{xs:4,lg:8}}
        sx={{ maxWidth: '826px', mx: 'auto', mb:{xs:"71px",lg:"142px"} }}
      >
        <Stack
          alignItems="center"
          sx={{
            border: '1px solid #E0E0E0',

            maxWidth:'496px',
            borderRadius: '8px',
            p: '16px',
          }}
        >
       
          <Box component='img' src={ukhub} sx={{width:{xs:"100px",lg:"290px"}}}></Box>
          <SocialButton text="@ukngtechhub" icon={<TwitterIcon />} link='https://twitter.com/ukngtechhub'/>
          <SocialButton text="@ukngtechhub" icon={<InstagramIcon />}link='https://www.instagram.com/ukngtechhub' />
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
        
           <Box component='img' src={devcareerhub} sx={{width:{xs:"100px",lg:"280px"}}}></Box>
          <SocialButton text="@dev_careers" icon={<TwitterIcon />} link='https://twitter.com/dev_careers' />
          <SocialButton text="DevCareer" icon={<LinkedinIcon />} link='https://www.linkedin.com/company/devcareers/' />
        </Stack>
      </Stack>
    </Box>
  );
};

export default DctpFooter;
