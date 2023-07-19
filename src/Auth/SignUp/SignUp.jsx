import { LoadingButton } from '@mui/lab';
import { Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import PasswordChecklist from 'react-password-checklist';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { signUp } from '../../../API/api';
import { AuthCard } from '../../Auth';
import { Input } from '../../components';

const SignUp = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [loading, setloading] = useState(false);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirm = (e) => {
    setConfirmPassword(e.target.value);
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .required('This field is required')
      .email('Please enter a valid mail'),
    username: Yup.string()
      .required('This field is required')
      .min(5, 'Username must be contain atleast 5 characters'),
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      if (passwordValid) {
        setloading(true);
        try {
          const res = await signUp({ ...values, password, confirmPassword });
          toast.success(res.data.message, { autoClose: 7000 });
          setloading(false);
        } catch (err) {
          toast.error(err.response.data.message, { autoClose: 7000 });
          setloading(false);
        }
      }
    },
  });

  return (
    <AuthCard>
      <Typography fontWeight="700" fontSize={{ xs: '16px', md: '24px' }}>
        Create Account
      </Typography>
      <Typography component="span" color="grey.600" mr="5px">
        Already have an account?
      </Typography>
      <Link
        to="?mode=forgetpassword"
        style={{
          fontWeight: 700,
          color: '#181818',
          textDecoration: 'none',
          borderBottom: '2px solid #181818',
        }}
      >
        Sign In
      </Link>
      <Stack gap="10px" mt="50px" mb="24px">
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
          title="Username"
          placeholder="Must contain atleast 5 characters"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          error={
            formik.errors.username && formik.touched.username
              ? formik.errors.username
              : ''
          }
        ></Input>
        <Input
          title="Password"
          onChange={handlePassword}
          type="password"
        ></Input>
        <Input
          title="Confirm Password"
          onChange={handlePasswordConfirm}
          type="password"
        ></Input>
      </Stack>
      <Typography color="grey.700">Password must:</Typography>
      <PasswordChecklist
        rules={['minLength', 'capital', 'lowercase', 'number', 'match']}
        minLength={8}
        value={password}
        valueAgain={confirmPassword}
        onChange={(isValid) => {
          isValid && setPasswordValid(true);
          !isValid && setPasswordValid(false);
        }}
        messages={{
          minLength: 'Be at least 8 characters long',
          capital: 'Contains at least one uppercase letter',
          lowercase: 'Contains at least one lowercase letter',
          number: 'Contains at least one number',
          match: 'Match',
        }}
      />

      <LoadingButton
        loading={loading}
        variant="contained"
        disabled={!passwordValid}
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
        Create Account
      </LoadingButton>
      {/* <Button onClick={handleSubmit}>Send request</Button> */}
    </AuthCard>
  );
};

export default SignUp;
