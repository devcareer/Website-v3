import { Box, Stack, Typography } from '@mui/material';
import { dpdlogo, uk } from '../../assets/Images';
const TitleBanner = ({ title, text = '', subtext = '', flag }) => {
  const bgStyle = {
    backgroundColor: '#E6F9F5',
    backgroundImage: { xs: 'none', xl: `url(${dpdlogo})` },
    backgroundSize: 'contain',
    backgroundPositionX: 'right ',
    backgroundRepeat: 'no-repeat',
    py: { xs: '1rem', lg: '2rem' },
  };
  return (
    <Stack
      justifyContent="flex-start"
      sx={flag ? { backgroundColor: '#E6F9F5' } : bgStyle}
    >
      <Box
        mx="auto"
        sx={{
          width: { xs: '90%', lg: '85%', mx: 'auto' },
          maxWidth: { xl: '1200px' },
          display: 'Flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Typography
            variant="body1"
            color="initial"
            sx={{
              fontSize: { xs: '16px', md: '35px', lg: '40px', xl: '55px' },
              fontWeight: '700',
              color: '#023E31',
              // mb: '8px',
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
              fontSize: { xs: '22px', md: '32px', lg: '42px' },
              color: '#025C49',
              fontWeight: '500',
            }}
          >
            {text}
          </Typography>
          {subtext && (
            <Typography
              variant="body1"
              color="initial"
              mt={-1.5}
              sx={{
                maxWidth: '795px',
                fontSize: { xs: '18px', md: '18px', lg: '30px' },
                color: '#025C49',
                fontWeight: '400',
              }}
            >
              {subtext}
            </Typography>
          )}
        </Box>
        {flag && (
          <Box
            component="img"
            src={uk}
            sx={{
              mixBlendMode: 'darken',
              width: { xs: '150px', md: '200px', lg: '250px' },
            }}
          ></Box>
        )}
      </Box>
      {/* <Box  sx={{border:"1px solid red"}}>
        <img src={dpdlogo} alt="pattern"  />
      </Box> */}
    </Stack>
  );
};

export default TitleBanner;
