import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ForgetPassword, SignUp } from '../../Auth';

const AuthRoot = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  if (mode === 'forgetpassword') return <ForgetPassword />;
  if (mode === 'signup') return <SignUp />;
};

export default AuthRoot;
