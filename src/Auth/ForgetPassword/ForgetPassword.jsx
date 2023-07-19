import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { forgetPassword } from '../../../API/api';
import { AuthCard } from '../../Auth';
import { Input } from '../../components';
const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await forgetPassword({ email });
      toast.success('we just emailed you');
      setLoading(false);
      console.log(response);
    } catch (error) {
      toast.error('The email address you provided does not exist');
      setLoading(false);
      console.log(error.message);
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
        <LoadingButton
          loading={loading}
          variant="contained"
          color="primary"
          fontSize="20px"
          sx={{ py: '24px', color: '#FEFEFE' }}
          onClick={handleClick}
        >
          Reset Password
        </LoadingButton>
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
