import React from 'react'
import {Typography,Box, Button,Stack} from '@mui/material'
import {Input} from '../../components'
import {dev} from '../../assets/Images/index'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
const ForgetPassword = () => {
  return (
    <Box sx={{maxWidth:'675px',mx:'auto',py:'64px'}}>
      <Box component='img' src={dev}></Box>
         <Box flexDirection='column' textAlign='center' display='flex' justifyContent='center' >
        <Typography variant="body1" color="initial" fontSize='24px' fontWeight='bold'>Forgot Password?</Typography>
        <Typography variant="body1" color="initial">Not to worry, follow the instructions below and you’ll be back in no time.</Typography>
        </Box>
         <Stack direction='column' sx={{gap:'24px',mt:'64px'}}>
         <Input title="Email Address" placeholder='Enter your email address'/>
         <Button variant='contained' color="primary" fontSize='20px'  sx={{py:'24px',color:'#FEFEFE'}}>
         Reset Password
         </Button>
         <Button variant='outlined' color="primary" fontSize='20px' sx={{py:'24px',color:'#888'}}>
         <KeyboardBackspaceIcon />  <Box ml={0.5}>Back to Login</Box>  
         </Button>
         <Stack direction='row' justifyContent='center' gap={0.5} >
       <Typography variant="body1" color="initial">Don’t have an account?</Typography>
       <Typography variant="body1" color="initial" fontWeight='bold'>Create an account</Typography>
       </Stack>
         </Stack>
   </Box>
  )
}

export default ForgetPassword