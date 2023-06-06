import { Box, Stack, Typography } from '@mui/material';
import { dpdlogo } from '../../assets/Images';
const TitleBanner = ({ title, text = '' }) => {
  return (
    <Stack
      justifyContent="flex-start"
      sx={{
        backgroundColor: '#E6F9F5',
        backgroundImage: { xs: 'none', xl: `url(${dpdlogo})` },
        backgroundSize: 'contain',
        backgroundPositionX: 'right ',
        backgroundRepeat: 'no-repeat',
        py:{xs:"1rem",lg:"2rem"} 
      }}
    >
      <Box mx="auto" sx={{ width: { xs: '90%', lg: '85%', mx: 'auto' }, maxWidth:{xl:"1200px"} }}>
        <Typography
          variant="body1"
          color="initial"
          sx={{
            fontSize: { xs: '28px', md: '35px', lg: '55px' },
            fontWeight: '700',
            color: '#023E31',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="initial"
          mt={-1.5}
          sx={{
            maxWidth: '795px',
            fontSize: { xs: '22px', md:"32px", lg: '42px' },
            color: '#025C49',
            fontWeight: '500',
          }}
        >
          {text}
        </Typography>
      </Box>
      {/* <Box  sx={{border:"1px solid red"}}>
        <img src={dpdlogo} alt="pattern"  />
      </Box> */}
    </Stack>
  );
};

export default TitleBanner;
