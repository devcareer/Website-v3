import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Input } from '../../components';
import { ActionButtons } from '../../Pages/Profile/EditProfile/WorkExperience';
import { useSearchParams } from 'react-router-dom/dist';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { profileActions } from '../../store';
import { LoadingButton } from '@mui/lab';
const AddEducationModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const educations = useSelector((state) => state.educations);
  const educationId = searchParams.get('id');
  const educationToEdit = educations.find((edu) => edu._id == educationId);
  const handleCloseModal = () => {
    closeModal();
    searchParams.delete('id');
    setSearchParams(searchParams);
  };
  const deleteEducation = () => {
    dispatch(profileActions.deleteEducation(educationId));
    closeModal();
  };
  const initialValues = {
    _id: educationToEdit?._id ?? Math.random(),
    schoolName: educationToEdit?.schoolName ?? '',
    degree: educationToEdit?.degree ?? '',
    course: educationToEdit?.course ?? '',
    startYear: educationToEdit?.startYear ?? '',
    endYear: educationToEdit?.endYear ?? '',
  };

  const formik = useFormik({
    initialValues,
    validate: (values) => {
      const errors = {};
      if (!values.schoolName) {
        errors.schoolName = 'This field is required';
      }
      if (!values.degree) {
        errors.degree = 'This field is required';
      }
      if (!values.course) {
        errors.course = 'This field is required';
      }
      if (!values.startYear) {
        errors.startYear = 'This field is required';
      }
      if (!values.endYear) {
        errors.endYear = 'This field is required';
      }
      return errors;
    },
    onSubmit: (values) => {
      console.log(values);
      educationToEdit
        ? dispatch(profileActions.editEducation(values))
        : dispatch(profileActions.addEducation(values));
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
        zIndex="4"
        height="80vh"
        sx={{
          overflowY: 'scroll',
        }}
      >
        <Typography
          fontWeight="500"
          fontSize="24px"
          color="text.grey.600"
          mb="40px"
        >
          Add Education
        </Typography>
        <Typography
          fontWeight="700"
          fontSize="24px"
          color="text.grey.300"
          mb="16px"
        >
          Academic Information
        </Typography>
        <Stack component="form" gap="16px">
          <Input
            title="School"
            placeholder="e.g Yale University"
            name="schoolName"
            onChange={formik.handleChange}
            value={formik.values.schoolName}
            onBlur={formik.handleBlur}
            error={
              formik.errors.schoolName && formik.touched.schoolName
                ? formik.errors.schoolName
                : ''
            }
          />
          <Input
            title="Degree"
            placeholder="e.g Master's"
            name="degree"
            onChange={formik.handleChange}
            value={formik.values.degree}
            onBlur={formik.handleBlur}
            error={
              formik.errors.degree && formik.touched.degree
                ? formik.errors.degree
                : ''
            }
          />
          <Input
            title="Field of Study"
            placeholder="e.g Psychology"
            name="course"
            onChange={formik.handleChange}
            value={formik.values.course}
            onBlur={formik.handleBlur}
            error={
              formik.errors.course && formik.touched.course
                ? formik.errors.course
                : ''
            }
          />
          <Stack direction={{ xs: 'column', md: 'row' }} gap="8px">
            <Input
              title="Start Year"
              type="month"
              width={{ xs: '100%', md: '50%' }}
              name="startYear"
              onChange={formik.handleChange}
              value={formik.values.startYear}
              onBlur={formik.handleBlur}
              error={
                formik.errors.startYear && formik.touched.startYear
                  ? formik.errors.startYear
                  : ''
              }
            />
            <Input
              title="End Year (or expected)"
              type="month"
              width={{ xs: '100%', md: '50%' }}
              name="endYear"
              onChange={formik.handleChange}
              value={formik.values.endYear}
              onBlur={formik.handleBlur}
              error={
                formik.errors.endYear && formik.touched.endYear
                  ? formik.errors.endYear
                  : ''
              }
            />
          </Stack>
        </Stack>
        <ActionButtons
          text="Save Changes"
          closeModal={handleCloseModal}
          handleSubmit={formik.handleSubmit}
        />
        {educationToEdit && (
          <LoadingButton
            onClick={deleteEducation}
            sx={{
              color: '#EE3011',
            }}
          >
            Delete Education
          </LoadingButton>
        )}
      </Stack>
    </Box>
  );
};

export default AddEducationModal;
