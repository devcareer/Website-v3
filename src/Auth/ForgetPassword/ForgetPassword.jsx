import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Box, Button, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthCard } from '../../Auth';
import { Input } from '../../components';
const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleClick = async () => {
    try {
      const response = await axios.post(
        'https://website-v3-znmt.onrender.com/api/v1/auth/signup',
        {
          email,
          username: 'sarah200',
          password: '12345',
          confirmPassword: '12345',
        }
      );
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
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
        <Input
          title="Email Address"
          placeholder="Enter your email address"
          value={email}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          fontSize="20px"
          sx={{ py: '24px', color: '#FEFEFE' }}
          onClick={handleClick}
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
            onClick={() => {
              navigate('?mode=signup');
            }}
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
