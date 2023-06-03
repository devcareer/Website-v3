import { Stack, Typography, Box } from '@mui/material';
import { dpdlogo } from '../../assets/Images';
const TitleBanner = ({ title, text = '' }) => {
  return (
    <Stack
      justifyContent="flex-start"
      sx={{
        backgroundColor: '#E6F9F5',
        backgroundImage: `url(${dpdlogo})`,
        backgroundSize: 'contain',
        backgroundPositionX: 'right ',
        backgroundRepeat: 'no-repeat',
        py: '4rem',
      }}
    >
      <Box width="85%" mx="auto">
        <Typography
          variant="body1"
          color="initial"
          sx={{ fontSize: '55px', fontWeight: '700', color: '#023E31' }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="initial"
          mt={-2}
          sx={{
            maxWidth: '795px',
            fontSize: '42px',
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
