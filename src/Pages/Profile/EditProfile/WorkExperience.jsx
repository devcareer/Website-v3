import React from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';
import { editIcon } from '../../../assets/Images';
import { AddExperienceModal } from '../../../components';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
const WorkExperience = () => {
  const [showModal, setShowModal] = useState(false);
  // const WORK_EXPERIENCE = [
  //   {
  //     companyName: 'Money Africa',
  //     jobTitle: 'Frontend Developer',
  //     startDate: 'Jan 2023',
  //     endDate: 'Apr 2023',
  //     status: 'Full Time',
  //   },
  //   {
  //     companyName: 'ZubiPay',
  //     jobTitle: 'Frontend Development Intern',
  //     startDate: 'Jan 2023',
  //     endDate: 'Apr 2023',
  //     status: 'Internship',
  //   },
  // ];
  const WORK_EXPERIENCE = useSelector((state) => state.experiences);
  // console.log(WORK_EXPERIENCE);
  const handleModalPopUp = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };
  return (
    <Box mt="40px">
      <Typography fontSize="24px" color="#212121" fontWeight="700" mb="16px">
        Work Experience
      </Typography>
      <Stack gap="16px">
        {WORK_EXPERIENCE.map((experience, i) => (
          <IndividualExperience
            experience={experience}
            key={i}
            openModal={handleModalPopUp}
          />
        ))}
      </Stack>
      <AddButton title="Add Work Experience" openModal={handleModalPopUp} />
      {showModal && <AddExperienceModal closeModal={handleModalClose} />}
    </Box>
  );
};

export default WorkExperience;

const IndividualExperience = (props) => {
  const { experience, openModal } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    companyName,
    jobTitle,
    startDate,
    endDate,
    employmentType,
    _id,
    tillPresent,
  } = experience;
  const startMonth = new Date(startDate).toLocaleString('default', {
    month: 'short',
  });
  const startYear = new Date(startDate).getFullYear();
  const endMonth = new Date(endDate).toLocaleString('default', {
    month: 'short',
  });
  const endYear = new Date(endDate).getFullYear();
  const editExperience = () => {
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
        <Typography
          component="h2"
          color="text.grey.800"
          fontWeight="700"
          fontSize="20px"
        >
          {jobTitle}
        </Typography>
        <Stack direction="row" color="text.grey.300" gap="4px">
          <Typography component="span">{companyName}</Typography> •
          <Typography component="span">{employmentType}</Typography>
        </Stack>
        <Stack direction="row" color="text.grey.300" gap="4px">
          <Typography component="span">{`${startMonth} ${startYear}`}</Typography>{' '}
          -
          <Typography component="span">
            {tillPresent ? 'Present' : `${endMonth} ${endYear}`}
          </Typography>
        </Stack>
      </Box>
      <Button onClick={editExperience}>
        <Box component="img" src={editIcon}></Box>
      </Button>
    </Stack>
  );
};

export const AddButton = ({ title, src, openModal }) => {
  return (
    <Button
      onClick={openModal}
      variant="outline"
      sx={{
        borderRadius: '8px',
        border: '1px solid #6D6D6D',
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        py: { xs: '16px', md: '20px' },
        mt: '16px',
        textTransform: 'capitalize',
        fontSize: '20px',
        width: '100%',
        color: '#6D6D6D',
      }}
    >
      {src ? (
        <Box component="img" src={src}></Box>
      ) : (
        <Typography component="span" fontWeight="500">
          +
        </Typography>
      )}
      <Typography component="span" fontWeight="500">
        {title}
      </Typography>
    </Button>
  );
};

export const ActionButtons = ({ text, closeModal, handleSubmit }) => {
  return (
    <Stack my="40px" direction="row" justifyContent="space-between">
      <Button
        onClick={closeModal}
        sx={{
          color: '#A3A3A3',
          border: '1px solid #A3A3A3',
          py: { xs: '10px ', md: '16px' },
          px: '24px',
          textTransform: 'capitalize',
          fontWeight: '500',
        }}
      >
        Cancel
      </Button>
      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{
          color: '#FFF',
          py: { xs: '10px ', md: '16px' },
          px: '24px',
          textTransform: 'capitalize',
          fontWeight: '500',
        }}
      >
        {text}
      </Button>
    </Stack>
  );
};
