import LoadingButton from '@mui/lab/LoadingButton';
import { Stack, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import PasswordChecklist from 'react-password-checklist';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from '../../../API/api';
import { AuthCard } from '../../Auth';
import { Input } from '../../components';
const CreateNewPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordConfirm = (e) => {
    setPasswordAgain(e.target.value);
  };
  const handleSubmit = async () => {
    const token = Cookies.get('resetPasswordToken');
    const cleanedToken = token.substring(2);
    setLoading(true);
    try {
      const response = await resetPassword({
        newPassword: password,
        token: cleanedToken,
      });
      toast.success(response.data.message);
      setLoading(false);
      console.log(response);
      navigate('/auth/?mode=signup');
    } catch (error) {
      toast.error('Email Authentication Failed');
      setLoading(false);
      console.log(error.message);
    }
  };
  return (
    <AuthCard>
      <Typography fontWeight="700" fontSize={{ xs: '16px', md: '24px' }}>
        Create New Password
      </Typography>
      <Typography component="span" color="grey.600" mr="5px">
        Not to worry, follow the instructions below and you’ll be back in no
        time.
      </Typography>

      <Stack gap="10px" mt="50px" mb="24px">
        <Input
          title="Password"
          onChange={handlePassword}
          type="Enter New Password"
        ></Input>
        <Input
          title="Confirm New Password "
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

      <LoadingButton
        onClick={handleSubmit}
        loading={loading}
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
        Reset Password
      </LoadingButton>
    </AuthCard>
  );
};

export default CreateNewPassword;
