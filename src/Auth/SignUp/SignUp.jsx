import { Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { AuthCard } from '../../Auth';
import { Input } from '../../components';
import { Link } from 'react-router-dom';
import PasswordChecklist from 'react-password-checklist';
// import signUpApi from '../../../api/signUp';
// import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignUp = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  // const [formIsValid, setFormIsValid] = useState(false);

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
    onSubmit: (values) => {
      if (passwordValid) {
        console.log('Everything is clear');
      } else {
        console.log('Everything is not clear yet');
      }
    },
  });
  // const handleSubmit = () => {
  //   console.log(import.meta.env.VITE_AUTH_BASE_URL + 'signup');
  //   const data = {
  //     email: 'Olaniranolatubosun@gmail.com',
  //     username: 'Niceguy',
  //     password: 'password',
  //     confirmPassword: 'password',
  //   };
  //   fetch('https://website-v3-znmt.onrender.com/api/v1/auth/signup', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((res) => {
  //       console.log(res);
  //       return res.json();
  //     })
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err));
  // };
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
          console.log(
            formik.errors.email,
            formik.errors.username,
            formik.errors,
            !undefined
          );

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

      <Button
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
      </Button>
      {/* <Button onClick={handleSubmit}>Send request</Button> */}
    </AuthCard>
  );
};

export default SignUp;
