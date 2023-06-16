import React from 'react';
import { Typography, Box, Button } from '@mui/material';

const SupportCard = ({ image, name, text, btntxt, link }) => {
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
      maxWidth={{ xs: '400px', md: 'unset' }}
    >
      <Box
        component="img"
        src={image}
        alt={name}
        alignSelf="center"
        height="auto"
        maxWidth={{ xs: '150px', md: 'unset' }}
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        alignSelf="end"
        mt="15px"
      >
        <Typography
          fontSize={{ xs: '16px', md: '20px' }}
          sx={{ color: (theme) => theme.palette.text.grey[700] }}
        >
          {text}
        </Typography>
        <Button
          variant="outlined"
          href={link}
          target="_blank"
          sx={{
            bgcolor: '#FEFEFE',
            color: (theme) => theme.palette.text.grey[700],
            borderColor: '#C2C2C2',
            py: '20px',
            borderRadius: '8px',
            width: '100%',
            mt: '32px',
            textTransform: 'capitalize',
          }}
        >
          {btntxt}
        </Button>
      </Box>
    </Box>
  );
};

export default SupportCard;
