import React from 'react';
import { Typography, Box, Button } from '@mui/material';

const SupportDonateCard = ({ image, name, text, title, btntxt }) => {
  return (
    <Box
      sx={{
        px: { xs: '24px', lg: '56px' },
        py: { xs: '28px', lg: '32px' },
        border: '1px solid #C2C2C2',
        borderRadius: '8px',
      }}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      rowGap="20px"
      maxWidth={{ xs: '400px', md: 'unset' }}
    >
      <Box>
        <Typography
          component="h3"
          fontSize={{ xs: '26px', lg: '32px' }}
          fontWeight={700}
          color="primary.main"
        >
          {title}
        </Typography>
        <Typography
          fontSize={{ xs: '16px', md: '20px' }}
          sx={{ color: (theme) => theme.palette.text.grey[700] }}
        >
          {text}
        </Typography>
      </Box>
      <Box>
        <Box component="img" src={image} alt={name} />
        <Button
          variant="contained"
          sx={{
            py: '20px',
            borderRadius: '8px',
            width: '100%',
            mt: '32px',
            color: '#FEFEFE',
          }}
        >
          {btntxt}
        </Button>
      </Box>
    </Box>
  );
};

export default SupportDonateCard;
