import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button, Stack } from '@mui/material';
import { Input } from '../../components';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { AuthCard } from '../../Auth';

const ForgetPassword = () => {
  const navigate = useNavigate();

  return (
    <AuthCard>
      <Box
        flexDirection="column"
        textAlign="center"
        display="flex"
        justifyContent="center"
      >
        <Typography
          variant="body1"
          color="initial"
          fontSize="24px"
          fontWeight="bold"
        >
          Forgot Password?
        </Typography>
        <Typography variant="body1" color="initial">
          Not to worry, follow the instructions below and you’ll be back in no
          time.
        </Typography>
      </Box>
      <Stack direction="column" sx={{ gap: '24px', mt: '64px' }}>
        <Input title="Email Address" placeholder="Enter your email address" />
        <Button
          variant="contained"
          color="primary"
          fontSize="20px"
          sx={{ py: '24px', color: '#FEFEFE' }}
        >
          Reset Password
        </Button>
        <Button
          variant="outlined"
          color="primary"
          fontSize="20px"
          sx={{ py: '24px', color: '#888' }}
        >
          <KeyboardBackspaceIcon /> <Box ml={0.5}>Back to Login</Box>
        </Button>
        <Stack direction="row" justifyContent="center" gap={0.5}>
          <Typography variant="body1" color="initial">
            Don’t have an account?
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            fontWeight="bold"
            onClick={() => navigate('?mode=signup')}
            sx={{
              cursor: 'pointer',
            }}
          >
            Create an account
          </Typography>
        </Stack>
      </Stack>
    </AuthCard>
  );
};

export default ForgetPassword;
