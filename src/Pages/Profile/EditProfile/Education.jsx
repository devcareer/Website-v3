import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { editIcon } from '../../../assets/Images';
import { AddButton } from './WorkExperience';
import { AddEducationModal } from '../../../components';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom/dist';
import { useSelector } from 'react-redux';
const Education = () => {
  const [showModal, setShowModal] = useState(false);
  const handleModalPopUp = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  // const EDUCATION_DETAILS = [
  //   {
  //     institution: 'New York University',
  //     field: 'Interaction Design',
  //     degree: 'Bachelor',
  //     startDate: '2014',
  //     endDate: '2018',
  //     id: 1,
  //   },
  //   {
  //     institution: 'Russian Institute of Technology',
  //     field: 'User Heuristics',
  //     degree: 'Master',
  //     startDate: '2019',
  //     endDate: '2021',
  //     id: 2,
  //   },
  // ];
  const EDUCATION_ARRAY = useSelector((state) => state.educations);
  return (
    <Box mt="40px">
      <Typography fontSize="24px" color="#212121" fontWeight="700" mb="16px">
        Education
      </Typography>
      <Stack gap="16px">
        {EDUCATION_ARRAY.map((education, i) => (
          <IndividualEducation
            education={education}
            key={i}
            openModal={handleModalPopUp}
          />
        ))}
      </Stack>
      <AddButton title="Add Education" openModal={handleModalPopUp} />
      {showModal && <AddEducationModal closeModal={handleModalClose} />}
    </Box>
  );
};

export default Education;

const IndividualEducation = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { education, openModal } = props;
  const {
    schoolName,
    course,
    degree,
    startYear: startDate,
    endYear: endDate,
    _id,
  } = education;
  const startYear = new Date(startDate).getFullYear();
  const endYear = new Date(endDate).getFullYear();
  const editEducation = () => {
    openModal();
    searchParams.set('id', _id);
    setSearchParams(searchParams);
  };
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
            {course}
          </Typography>
        </Stack>
        <Typography component="h2" color="text.grey.700" fontWeight="500">
          {schoolName}
        </Typography>
        <Stack direction="row" color="text.grey.800" gap="4px" fontsize="20px">
          <Typography component="span" fontWeight="500">
            {startYear}
          </Typography>{' '}
          -
          <Typography component="span" fontWeight="500">
            {endYear}
          </Typography>
        </Stack>
      </Box>
      <Button onClick={editEducation}>
        <Box component="img" src={editIcon}></Box>
      </Button>
    </Stack>
  );
};
