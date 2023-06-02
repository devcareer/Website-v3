import { Stack, Typography, Box } from '@mui/material';
import React from 'react';

const Process = (props) => {
  const { process, title } = props;
  const bg = "url('/src/assets/Images/processBg.svg')";
  return (
    <Box
      bgcolor="#FEFEFE"
      sx={{
        backgroundImage: bg,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right bottom',
      }}
    >
      <Stack pt="88px" pb="200px" width="85%" mx="auto">
        <Typography
          component="h2"
          fontWeight="700"
          fontSize="40px"
          mb="94px"
          width="50%"
          textAlign="center"
          alignSelf="center"
        >
          {title}
        </Typography>
        <Box
          display="grid"
          gridTemplateColumns="repeat(2, 1fr)"
          gap="16px 24px"
        >
          {process.map((stage, index) => (
            <Stack
              bgcolor="#FEFEFE"
              border="1px solid #c2c2c2"
              py="56px"
              borderRadius="8px"
              px="20px"
              marginTop={index === 1 ? '80px' : '0px'}
            >
              <img
                src={stage.icon}
                alt={stage.title}
                height="96px"
                width="96px"
              ></img>
              <Typography
                component="h2"
                fontWeight="600"
                fontSize="40px"
                color="#181818"
                mt="30px"
                mb="16px"
              >
                {stage.title}
              </Typography>
              <Typography
                component="p"
                color="text.grey.600"
                fontSize="24px"
                fontWeight="400"
              >
                {stage.description}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Box>
  );
};

export default Process;
