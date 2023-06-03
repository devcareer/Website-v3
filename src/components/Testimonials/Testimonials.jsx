import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import {
  quotes,
  avatar1,
  avatar2,
  avatar3,
  arrowLeft,
  arrowRight,
} from '../../assets/Images';

const testimonials = [
  {
    description: `It’s been a great jouerny leanrning with DevCareer and it’s really great. It’s been a great jouerny leanrning with DevCareer and it’s really great
    It’s been a great jouerny leanrning with DevCareer and it’s really great. It’s been a great jouerny leanrning with DevCareer and it’s really great`,
    photo: avatar1,
    name: 'Tolu David',
    profession: 'Backend Engineer',
  },
  {
    description: `It’s been a great jouerny leanrning with DevCareer and it’s really great. It’s been a great jouerny leanrning with DevCareer and it’s really great
    It’s been a great jouerny leanrning with DevCareer and it’s really great. It’s been a great jouerny leanrning with DevCareer and it’s really great`,
    photo: avatar2,
    name: 'Olaniran Ridwan',
    profession: 'Frontend Engineer',
  },
  {
    description: `It’s been a great jouerny leanrning with DevCareer and it’s really great. It’s been a great jouerny leanrning with DevCareer and it’s really great
    It’s been a great jouerny leanrning with DevCareer and it’s really great. It’s been a great jouerny leanrning with DevCareer and it’s really great`,
    photo: avatar3,
    name: 'Ogunmola Emmanuel',
    profession: 'Frontend Engineer',
  },
];
const Testimonials = () => {
  return (
    <Box component="section" py="90px">
      <Stack
        direction="row"
        justifyContent="space-between"
        width="85%"
        mx="auto"
        mb="50px"
      >
        <img src={quotes} alt="quotes"></img>
        <Typography component="h2" fontSize="24px" color="text.grey.500">
          Hear From our Beneficiaries
        </Typography>
        <Box></Box>
      </Stack>
      <Stack
        pt="25px"
        sx={{
          backgroundImage: 'linear-gradient(to bottom, #B5E48C 80%, #fff 30% )',
        }}
      >
        <Box
          display="grid"
          gridTemplateColumns={{ sm: '1fr', md: 'repeat(3, 1fr)' }}
          width="85%"
          mx="auto"
          gap="25px"
        >
          {testimonials.map((info, i) => (
            <TestimonialCard info={info} />
          ))}
        </Box>
      </Stack>
      <Stack gap="10px" direction="row" mt="50px" width="85%" mx="auto">
        <Button>
          <img src={arrowLeft} alt="arrow-left"></img>
        </Button>
        <Button>
          <img src={arrowRight} alt="arrow-right"></img>
        </Button>
      </Stack>
    </Box>
  );
};

export default Testimonials;

const TestimonialCard = (props) => {
  const { description, photo, profession, name } = props.info;
  return (
    <Stack
      gap="70px"
      p="16px"
      border="1px solid #c2c2c2"
      borderRadius=".5rem"
      bgcolor="#FEFEFE"
    >
      <Typography fontSize="16px" color="text.grey.600">
        {description}
      </Typography>
      <Stack direction="row" gap="1rem">
        <img src={photo} alt={name} height="56px" width="56px"></img>
        <Stack gap="4px">
          <Typography fontWeight="500" fontSize="20px" color="text.black.100">
            {name}
          </Typography>
          <Typography fontWeight="400" fontSize="16px" color="text.grey.900">
            {profession}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
