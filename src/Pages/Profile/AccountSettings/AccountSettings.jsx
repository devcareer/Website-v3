import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import PasswordChecklist from 'react-password-checklist';
import { toast } from 'react-toastify';
import { changePassword } from '../../../API/api';
import { Input } from '../../../components';
const AccountSettings = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const handlePassword = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await changePassword({
        userId: '64abb8b4acc4e4690c5cbc87',
        currentPassword:password.currentPassword,
        newPassword: password.newPassword,
      });
      toast.success(response.data.message);
      setLoading(false);
      console.log(response);
    } catch (error) {
      toast.error('network error');
      setLoading(false);
      console.log(error.message);
    }
  };
  return (
    <Box sx={{ maxWidth: '1018px', mx: 'auto', px: '136px', py: '48px' }}>
      <Typography variant="body1" color="#888888" fontSize="24px">
        Account Settings
      </Typography>
      <Typography
        variant="body1"
        color="#212121"
        mb="8px"
        mt="32px"
        fontSize="24px"
        fontWeight="bold"
      >
        Change Password
      </Typography>
      <Typography variant="body1" color="initial">
        Changing your password regularly helps protect your personal information
        and ensures the safety of your account. In this section, you can easily
        modify your password to a new one of your choice. Please follow the
        instructions below to change your password and maintain the utmost
        security for your account.
      </Typography>
      <Stack gap="16px" mt="24px">
        <Input
          name="currentPassword"
          title="Current Password"
          type="password"
          onChange={handlePassword}
        />
        <Input
          name="newPassword"
          title="New Password"
          type="password"
          onChange={handlePassword}
        />
        <Input
          name="confirmPassword"
          title="Confirm Password"
          type="password"
          onChange={handlePassword}
        />
      </Stack>
      {/* <Typography variant="body1" color="initial" mt="32px">
        Password Requirements:
      </Typography>
      <Stack direction="row">
        <CheckIcon sx={{ color: '#05B993' }} />
        <Typography variant="body1" color="initial" fontSize="20px">
          Be at least 8 characters long
        </Typography>
      </Stack>
      <Stack direction="row">
        <CheckIcon sx={{ color: '#05B993' }} />
        <Typography variant="body1" color="initial" fontSize="20px">
          Contains at least one uppercase letter
        </Typography>
      </Stack>
      <Stack direction="row">
        <CheckIcon sx={{ color: '#05B993' }} />
        <Typography variant="body1" color="initial" fontSize="20px">
          Contains at least one lowercase letter
        </Typography>
      </Stack>
      <Stack direction="row">
        <CheckIcon sx={{ color: '#05B993' }} />
        <Typography variant="body1" color="initial" fontSize="20px">
          Contains at least one number
        </Typography>
      </Stack> */}
      <Typography color="grey.700">Password must:</Typography>
      <PasswordChecklist
        rules={['minLength', 'capital', 'lowercase', 'number', 'match']}
        minLength={8}
        value={password.newPassword}
        valueAgain={password.confirmPassword}
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
      <Stack direction="row" justifyContent="space-between" mt="32px">
        <Button
          variant="outlined"
          sx={{ px: '32px', py: '24px', borderRadius: '8px' }}
        >
          Cancel
        </Button>
        <LoadingButton
          loading={loading}
          onClick={handleSubmit}
          variant="contained"
          sx={{ px: '32px', py: '24px', color: '#FEFEFE', borderRadius: '8px' }}
        >
          Apply Changes
        </LoadingButton>
      </Stack>
    </Box>
  );
};

export default AccountSettings;
