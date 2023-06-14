import { Box, Stack, Typography } from '@mui/material';
import { question } from '../../assets/Images';
import { Form } from '../../components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ContactUs = () => {
  return (
    <Box position='relative' sx={{background: 'linear-gradient(170deg, #ACE8DB,#FFF)'}}>
      <ToastContainer />
    <Box
      paddingY={5}
      pb="15rem"
      sx={{
        width:{xs:"90%",lg:"85%"},
        maxWidth:{xl:"1200px"},
        mx:"auto"
      }}
    >
      <Typography variant="body1" color="initial" textAlign="center" sx={{fontSize:{xs:"20px",md:"30px",lg:"56px"},fontWeight:"700",color:"#181818"}}>
        We'd love to hear from you!
      </Typography>
      <Typography variant="body1" pb={{xs:"50px",lg:"72px"}} color="initial" textAlign="center" sx={{maxWidth:"908px", mx:"auto",fontSize:{xs:"16px",md:"18px",lg:"20px"},color:"#6D6D6D"}}>
        We value your feedback and inquiries. Please fill out the form below,
        and our team will get back to you as soon as possible.
      </Typography>
      <Stack alignItems="center" >
        <Form />
        <Box position='absolute' zIndex='10' right='0' bottom='-10px'><img src={question} alt="chat" /></Box>
      </Stack>
    </Box>
    </Box>
  );
};

export default ContactUs;
