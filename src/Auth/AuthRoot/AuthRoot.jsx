import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ForgetPassword, SignUp,CreateNewPassword } from '../../Auth';

const AuthRoot = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  if (mode === 'forgetpassword') return <ForgetPassword />;
  if (mode === 'signup') return <SignUp />;
  if (mode === 'createnewpassword') return <CreateNewPassword />;

};

export default AuthRoot;
