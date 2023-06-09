import { Stack, Typography, Box } from '@mui/material';
import { processBg } from '../../assets/Images';
import React from 'react';

const Process = (props) => {
  const { process, title } = props;
  const bg = `url(${processBg})`;
  return (
    <Box
      component="section"
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
          fontSize={{ xs: '24px', md: '40px' }}
          mb="94px"
          width={{ xs: '100%', lg: '50%' }}
          textAlign="center"
          alignSelf="center"
        >
          {title}
        </Typography>
        {/* <Box
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
          
        </Box> */}
        <Box
          display="grid"
          gridTemplateColumns={{ xs: '1fr', lg: '1fr 1fr' }}
          columnGap="24px"
        >
          <Stack gap="16px">
            {process.map((stage, index) =>
              index === 0 || index % 2 === 0 ? (
                <Stack
                  bgcolor="#FEFEFE"
                  border="1px solid #c2c2c2"
                  py="56px"
                  borderRadius="8px"
                  px="20px"
                >
                  <Box
                    component="img"
                    src={stage.icon}
                    alt={stage.title}
                    height="96px"
                    width={{ xs: '70px', md: '96px' }}
                  ></Box>
                  <Typography
                    component="h2"
                    fontWeight="600"
                    fontSize={{ xs: '24px', md: '30px' }}
                    color="#181818"
                    mt="30px"
                    mb="16px"
                    fontFamily="Euclid"
                  >
                    {stage.title}
                  </Typography>
                  <Typography
                    component="p"
                    color="text.grey.600"
                    fontSize={{ xs: '16px', md: '20px' }}
                    fontWeight="400"
                  >
                    {stage.description}
                  </Typography>
                </Stack>
              ) : (
                ''
              )
            )}
          </Stack>
          <Stack gap="16px" pt={{ xs: '16px', lg: '80px' }}>
            {process.map((stage, index) =>
              index === 1 || index % 2 !== 0 ? (
                <Stack
                  bgcolor="#FEFEFE"
                  border="1px solid #c2c2c2"
                  py="56px"
                  borderRadius="8px"
                  px="20px"
                >
                  <Box
                    component="img"
                    src={stage.icon}
                    alt={stage.title}
                    height="96px"
                    width={{ xs: '70px', md: '96px' }}
                  ></Box>
                  <Typography
                    component="h2"
                    fontWeight="600"
                    fontSize={{ xs: '24px', md: '30px' }}
                    color="#181818"
                    mt="30px"
                    mb="16px"
                  >
                    {stage.title}
                  </Typography>
                  <Typography
                    component="p"
                    color="text.grey.600"
                    fontSize={{ xs: '16px', md: '20px' }}
                    fontWeight="400"
                  >
                    {stage.description}
                  </Typography>
                </Stack>
              ) : (
                ''
              )
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Process;
