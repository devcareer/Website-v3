import React, { useState } from 'react';
import { Typography, Stack, styled, Box } from '@mui/material';
import { AuthCard } from '../../Auth';
import { Link } from 'react-router-dom';
import { Input } from '../../components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signIn } from '../../../API/api';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';

const SignIn = () => {
  const [loading, setloading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .required('This field is required')
      .email('Please enter a valid mail'),
    password: Yup.string().required('Please enter a password'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setloading(true);
      try {
        const res = await signIn({ ...values });
        toast.success(res.data.message, { autoClose: 7000 });
        setloading(false);
      } catch (err) {
        toast.error(err.response.data.message, { autoClose: 7000 });
        setloading(false);
      }
    },
  });

  return (
    <AuthCard>
      <Typography fontWeight="700" fontSize={{ xs: '16px', md: '24px' }}>
        Welcome to DevCareer,
      </Typography>
      <Typography fontWeight="700" fontSize={{ xs: '16px', md: '24px' }}>
        Sign In to Continue
      </Typography>
      <Box mt="20px">
        <Typography component="span" color="grey.600" mr="5px" mt="10px">
          Don't have an account?
        </Typography>
        <Link
          to="?mode=signup"
          style={{
            fontWeight: 700,
            color: '#181818',
            textDecoration: 'none',
            fontSize: '14px',
            borderBottom: '1px solid #181818',
          }}
        >
          Create an account
        </Link>
      </Box>

      <Stack gap="10px" mt="50px" mb="24px" rowGap="20px">
        <Input
          title="Email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={
            formik.errors.email && formik.touched.email
              ? formik.errors.email
              : ''
          }
        ></Input>
        <Input
          title="Password"
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={
            formik.errors.password && formik.touched.password
              ? formik.errors.password
              : ''
          }
        ></Input>
      </Stack>
      <StyledLink to="?mode=forgetpassword">Forgot Password?</StyledLink>
      <LoadingButton
        loading={loading}
        variant="contained"
        disabled={!formik.values.email || !formik.values.password}
        sx={{
          color: '#FEFEFE',
          py: '16px',
          textTransform: 'capitalize',
          width: '100%',
          fontSize: '20px',
          fontWeight: '500',
          mt: '24px',
        }}
        onClick={formik.handleSubmit}
      >
        Log In
      </LoadingButton>
    </AuthCard>
  );
};

const StyledLink = styled(Link)(
  ({ theme }) => `
  font-weight: 500;
  color: ${theme.palette.text.grey[700]};
  text-decoration: none;
  display: block;
  text-align: right;

  &:hover {
    text-decoration: underline;
  }
`
);

export default SignIn;
