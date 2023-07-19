import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { editIcon } from '../../../assets/Images';
import { AddButton } from './WorkExperience';
const Education = () => {
  const EDUCATION_DETAILS = [
    {
      institution: 'New York University',
      field: 'Interaction Design',
      degree: 'Bachelor',
      startDate: '2014',
      endDate: '2018',
    },
    {
      institution: 'Russian Institute of Technology',
      field: 'User Heuristics',
      degree: 'Master',
      startDate: '2019',
      endDate: '2021',
    },
  ];
  return (
    <Box mt="40px">
      <Typography fontSize="24px" color="#212121" fontWeight="700" mb="16px">
        Education
      </Typography>
      <Stack gap="16px">
        {EDUCATION_DETAILS.map((education, i) => (
          <IndividualEducation education={education} key={i} />
        ))}
      </Stack>
      <AddButton title="Add Education" />
    </Box>
  );
};

export default Education;

const IndividualEducation = (props) => {
  const { education } = props;
  const { institution, field, degree, startDate, endDate } = education;
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
    >
      <Box display="flex" flexDirection="column" gap="5px">
        <Stack direction="row" gap="4px" fontsize="20px">
          <Typography component="span" color="text.grey.700">
            {degree}
          </Typography>
          <Typography component="span" color="text.grey.800" fontWeight="500">
            •
          </Typography>
          <Typography component="span" color="text.grey.300" fontWeight="500">
            {field}
          </Typography>
        </Stack>
        <Typography
          component="h2"
          color="text.grey.700"
          fontWeight="500"
          fontSize="20px"
        >
          {institution}
        </Typography>
        <Stack direction="row" color="text.grey.800" gap="4px" fontsize="20px">
          <Typography component="span" fontWeight="500">
            {startDate}
          </Typography>{' '}
          -
          <Typography component="span" fontWeight="500">
            {endDate}
          </Typography>
        </Stack>
      </Box>
      <Button>
        <Box component="img" src={editIcon}></Box>
      </Button>
    </Stack>
  );
};
