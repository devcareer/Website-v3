import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { ActionButtons } from '../../Pages/Profile/EditProfile/WorkExperience';
import { useFormik } from 'formik';
import DpdInput from '../Input/DpdInput';
import { useSearchParams } from 'react-router-dom';

const AddTeamModal = ({ closeModal, dispatchFn, team: TEAM }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const memberToEditId = Number(searchParams.get('id'));
  const memberToEdit = TEAM.find((member) => member.id === memberToEditId);
  const handleModalClose = () => {
    closeModal();
    searchParams.delete('id');
    setSearchParams(searchParams);
  };
  const handleEditMember = () => {
    dispatchFn({
      type: 'EDIT_MEMBER',
      data: { ...values, id: memberToEditId },
    });
    searchParams.delete('id');
    setSearchParams(searchParams);
  };
  const { handleBlur, handleChange, values, handleSubmit, touched, errors } =
    useFormik({
      initialValues: {
        fullName: memberToEdit?.fullName ?? '',
        email: memberToEdit?.email ?? '',
      },
      validate: (values) => {
        const emailRegex = /^\s*([^\s@]+)@([^\s@]+\.[^\s@]+)\s*$/;
        const errors = {};
        if (!values.fullName) {
          errors.fullName = 'Enter your Full Namee';
        }
        if (!emailRegex.test(values.email)) {
          errors.email = 'Enter a Valid Email Address';
        }
        return errors;
      },
      onSubmit: () => {
        memberToEdit
          ? handleEditMember()
          : dispatchFn({
              type: 'ADD_MEMBER',
              data: { ...values, id: Math.random() * 6 },
            });
        closeModal();
      },
    });
  return (
    <Box>
      <Box
        onClick={handleModalClose}
        className="overlay"
        bgcolor="rgba(0,0,0,0.5)"
        position="fixed"
        top="0"
        left="0"
        width="100vw"
        height="100vh"
        zIndex="2"
      ></Box>
      <Stack
        gap={{ xs: '20px', md: '40px' }}
        bgcolor="#fff"
        borderRadius="8px"
        width="90%"
        maxWidth="1000px"
        px={{ xs: '30px', lg: '136px' }}
        py={{ xs: '20px', md: '48px' }}
        position="fixed"
        top={{ xs: '5%', md: '10%' }}
        left="50%"
        zIndex="4"
        height="fit-content"
        sx={{
          overflowY: 'scroll',
          transform: 'translateX(-50%)',
        }}
      >
        <Typography fontSize={{ xs: '20px', md: '24px' }} color="text.grey.600">
          Add New Team Mate
        </Typography>
        <Stack gap="16px">
          <DpdInput
            label="Full Name"
            name="fullName"
            error={errors.fullName && touched.fullName ? errors.fullName : ''}
            id="fullName"
            onChange={handleChange}
            onBlur={handleBlur}
            required={true}
            value={values.fullName}
          />
          <DpdInput
            label="Email"
            name="email"
            error={errors.email && touched.email ? errors.email : ''}
            id="fullName"
            onChange={handleChange}
            onBlur={handleBlur}
            required={true}
            value={values.email}
          />
        </Stack>
        <ActionButtons
          text="Add Team Member"
          closeModal={handleModalClose}
          handleSubmit={handleSubmit}
        />
      </Stack>
    </Box>
  );
};

export default AddTeamModal;
