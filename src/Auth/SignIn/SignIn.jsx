import React from 'react';
import { Typography, Stack, Button } from '@mui/material';
import { AuthCard } from '../../Auth';
import { Link } from 'react-router-dom';
import { Input } from '../../components';

const SignIn = () => {
  return (
    <AuthCard>
      <Typography fontWeight="700" fontSize={{ xs: '16px', md: '24px' }}>
        Sign In
      </Typography>
      <Typography component="span" color="grey.600" mr="5px">
        Don't have an account?
      </Typography>
      <Link
        to="?mode=signup"
        style={{
          fontWeight: 700,
          color: '#181818',
          textDecoration: 'none',
          borderBottom: '2px solid #181818',
        }}
      >
        Sign Up
      </Link>
      <Stack gap="10px" mt="50px" mb="24px">
        <Input title="Username" placeholder="username" name="username"></Input>
        <Input title="Password" type="password"></Input>
      </Stack>
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
        Log In
      </Button>
    </AuthCard>
  );
};

export default SignIn;
