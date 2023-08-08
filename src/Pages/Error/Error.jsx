import { Box,Typography,Button} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <Box  p='50px' sx={{boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', mt:'40px', borderRadius:"8px", maxWidth:"700px",mx:"auto"}}>
      <Typography sx={{fontWeight:'700',fontSize:'40px'}} color='primary' >Oops! Something Went Wrong</Typography>
      <Typography sx={{fontSize:'20px'}}>
        Uh-oh! It looks like there was a problem during the signup and
        verification process. No worries, we're here to help you sort it out!
      </Typography>
      <Typography sx={{fontSize:'20px'}}>Here's what you can do to get back on track:</Typography>
      <ol>
        <li>
          <strong>Sign Up Again: </strong>If your verification link expired or the token didn't
          work, just sign up again using the same email. You'll get a new link
          to complete the process.
        </li>
        <li>
         <strong>Get Help:</strong>  If things still aren't cooperating or you have other
          questions, reach out to our support team at support@devcareer.io.
          We're here to assist you!
        </li>
      </ol>

      <Typography sx={{fontSize:'18px',mt:'10px'}}>
        We apologize for any frustration this may cause. Your security and
        experience are super important to us, and we're committed to getting
        everything fixed ASAP. Thanks for understanding, and we'll have you up
        and running in no time! Warm regards, The Devcareer Team
      </Typography>
     <Box display='flex'  mx='auto' mt='20px' justifyContent='center'>
     <Link to='/' > <Button variant='contained' color='primary' fontSize="20px"
          sx={{ py: '8px', color: '#FFF' }}>Back To Home Page</Button></Link>
    </Box> 
    </Box>
  );
};

export default Error;
