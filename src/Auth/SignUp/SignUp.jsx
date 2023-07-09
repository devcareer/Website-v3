import { Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { AuthCard } from '../../Auth';
import { Input } from '../../components';
import { Link } from 'react-router-dom';
import PasswordChecklist from 'react-password-checklist';

const SignUp = () => {
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirm = (e) => {
    setPasswordAgain(e.target.value);
  };
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
        <Input title="Email"></Input>
        <Input title="Username"></Input>
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
        valueAgain={passwordAgain}
        onChange={(isValid) => {
          console.log('Password Valid!');
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
        sx={{
          color: '#FEFEFE',
          py: '16px',
          textTransform: 'capitalize',
          width: '100%',
          fontSize: '20px',
          fontWeight: '500',
          mt: '24px',
        }}
      >
        Create Account
      </Button>
    </AuthCard>
  );
};

export default SignUp;
