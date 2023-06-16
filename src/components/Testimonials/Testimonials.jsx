import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import {
  quotes,
  idris,
  john,
  ayomikun,
  arrowLeft,
  arrowRight,
} from '../../assets/Images';

const testimonials = [
  {
    description:
      'Having the opportunity to participate in the first cohort of Devcareer program was one of the best thing that happened to me in year 2019, I knew about the program the time I was planning to transition fully into tech. The program gave me a good foundation and I never regretted leaving a research graduate assistant job for it.',
    photo: ayomikun,
    name: 'Ayomikun Emmanuel',
    profession: 'Backend Engineer',
  },
  {
    description: `DevCareers was the turning point of my Tech career, there won't be my success story in the tech industry without DevCareers. The mentorship I got from the #laptop4developers program was, in fact, a huge push to my technical and collaborative skills and right now I can easily pick up any technology and create magic with it whether individually or in a team. A big thank you to the guys at Devcareers`,
    photo: idris,
    name: 'Idris Olaoye',
    profession: 'Frontend Engineer',
  },
  {
    description: `I got into DevCareer with no direction in the tech field, DevCareer gave me all the supports and fast-tracked my tech journey. Within the three months of Training, collaboration on Projects, mentorship, learning and support, I was transformed into a Software Engineer. Right now, I work with a Fintech company with a lot of experience in the bag.`,
    photo: john,
    name: 'John Ajeigbe',
    profession: 'Frontend Engineer',
  },
];
const Testimonials = () => {
  return (
    <Box component="section" py="90px">
      <Stack
        direction="row"
        justifyContent="space-between"
        className="container"
        mb="50px"
      >
        <Box
          component="img"
          src={quotes}
          alt="quotes"
          width={{ xs: '60px', md: 'auto' }}
        ></Box>
        <Typography
          component="h2"
          fontSize={{ xs: '20px', md: '32px' }}
          color="text.grey.500"
        >
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
          className="container"
          gap="25px"
        >
          {testimonials.map((info, i) => (
            <TestimonialCard info={info} />
          ))}
        </Box>
      </Stack>
      <Stack gap="10px" direction="row" mt="50px" className="container">
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
      justifyContent="space-between"
    >
      <Typography fontSize="16px" color="text.grey.600">
        {description}
      </Typography>
      <Stack direction="row" gap="1rem">
        <Box
          component="img"
          src={photo}
          alt={name}
          height="56px"
          width="56px"
          borderRadius="50%"
        ></Box>
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
