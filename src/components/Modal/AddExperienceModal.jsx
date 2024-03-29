import React, { useState } from 'react';
import {
  Box,
  Stack,
  Typography,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Input } from '../../components';
import { ActionButtons } from '../../Pages/Profile/EditProfile/WorkExperience';
import { useDispatch, useSelector } from 'react-redux';
import { profileActions } from '../../store';
import { useFormik } from 'formik';
import { useSearchParams } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';

const AddExperienceModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const experiences = useSelector((state) => state.experiences);
  const experienceId = searchParams.get('id');
  const experienceToEdit = experiences.find((exp) => exp._id === experienceId);
  const [tillPresent, setTillPresent] = useState(
    experienceToEdit?.tillPresent ?? true
  );
  const handleCloseModal = () => {
    closeModal();
    searchParams.delete('id');
    setSearchParams(searchParams);
  };
  const deleteExperience = () => {
    dispatch(profileActions.deleteExperience(experienceId));
    closeModal();
  };
  const initialValues = {
    _id: experienceToEdit?._id ?? Math.random().toString(),
    companyName: experienceToEdit?.companyName ?? '',
    jobTitle: experienceToEdit?.jobTitle ?? '',
    startDate: experienceToEdit?.startDate ?? '',
    employmentType: experienceToEdit?.employmentType ?? '',
    endDate: experienceToEdit?.endDate ?? '',
  };
  const handleTillPresentCheck = () => {
    setTillPresent((prev) => !prev);
  };
  const formik = useFormik({
    initialValues,
    validate: (values) => {
      const errors = {};
      if (!values.companyName) {
        errors.companyName = 'This field is required';
      }
      if (!values.jobTitle) {
        errors.jobTitle = 'This field is required';
      }
      if (!values.employmentType) {
        errors.employmentType = 'This field is required';
      }
      if (!values.startDate) {
        errors.startDate = 'This field is required';
      }
      if (!tillPresent && !values.endDate) {
        errors.endDate = 'This field is required';
      }
      return errors;
    },
    onSubmit: (values) => {
      console.log({ ...values, tillPresent });
      experienceToEdit
        ? dispatch(profileActions.editExperience({ ...values, tillPresent }))
        : dispatch(profileActions.addExperience({ ...values, tillPresent }));
      closeModal();
    },
  });

  return (
    <Box>
      <Box
        onClick={handleCloseModal}
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
        height="80vh"
        sx={{
          overflowY: 'scroll',
          transform: 'translateX(-50%)',
        }}
      >
        <Typography
          fontWeight="500"
          fontSize="24px"
          color="text.grey.600"
          mb="40px"
        >
          Add Work Experience
        </Typography>
        <Typography
          fontWeight="700"
          fontSize="24px"
          color="text.grey.300"
          mb="16px"
        >
          Work Information
        </Typography>
        <Stack component="form" gap="16px">
          <Input
            title="Company Name"
            placeholder="e.g Amazon"
            name="companyName"
            onChange={formik.handleChange}
            value={formik.values.companyName}
            onBlur={formik.handleBlur}
            error={
              formik.errors.companyName && formik.touched.companyName
                ? formik.errors.companyName
                : ''
            }
          />
          <Input
            title="Job Title"
            placeholder="e.g Frontend Engineer"
            name="jobTitle"
            onChange={formik.handleChange}
            value={formik.values.jobTitle}
            onBlur={formik.handleBlur}
            error={
              formik.errors.jobTitle && formik.touched.jobTitle
                ? formik.errors.jobTitle
                : ''
            }
          />
          <Input
            title="Type of Employment"
            placeholder="e.g Full Time"
            name="employmentType"
            onChange={formik.handleChange}
            value={formik.values.employmentType}
            onBlur={formik.handleBlur}
            error={
              formik.errors.employmentType && formik.touched.employmentType
                ? formik.errors.employmentType
                : ''
            }
          />
          <Stack direction={{ xs: 'column', md: 'row' }} gap="8px">
            <Input
              title="Start Date"
              type="month"
              width={{ xs: '100%', md: '50%' }}
              name="startDate"
              onChange={formik.handleChange}
              value={formik.values.startDate}
              onBlur={formik.handleBlur}
              error={
                formik.errors.startDate && formik.touched.startDate
                  ? formik.errors.startDate
                  : ''
              }
            />
            <Input
              disabled={tillPresent}
              title="End Date"
              type="month"
              width={{ xs: '100%', md: '50%' }}
              name="endDate"
              onChange={formik.handleChange}
              value={formik.values.endDate}
              onBlur={formik.handleBlur}
              error={
                formik.errors.endDate && formik.touched.endDate
                  ? formik.errors.endDate
                  : ''
              }
            />
          </Stack>
        </Stack>
        <FormControlLabel
          required
          control={
            <Checkbox
              onClick={handleTillPresentCheck}
              defaultChecked={tillPresent}
            />
          }
          label="I'm currently working in this role"
        />
        <ActionButtons
          text="Save Changes"
          closeModal={handleCloseModal}
          handleSubmit={formik.handleSubmit}
        />
        {experienceToEdit && (
          <LoadingButton
            onClick={deleteExperience}
            sx={{
              color: '#EE3011',
            }}
          >
            Delete Experience
          </LoadingButton>
        )}
      </Stack>
    </Box>
  );
};

export default AddExperienceModal;
