import { Box, Stack, Typography } from '@mui/material';
import { question } from '../../assets/Images';
import { Form } from '../../components';
const ContactUs = () => {
  return (
    <Box position='relative' sx={{background: 'linear-gradient(170deg, #ACE8DB,#FFF)'}}>
    <Box
      paddingY={5}
      pb="15rem"
      sx={{
        width:{xs:"90%",lg:"85%"},
        mx:"auto"
      }}
    >
      <Typography variant="body1" color="initial" textAlign="center" sx={{fontSize:"56px",fontWeight:"700",color:"#181818"}}>
        We'd love to hear from you!
      </Typography>
      <Typography variant="body1" pb='72px' color="initial" textAlign="center" sx={{fontSize:"20px",color:"#6D6D6D"}}>
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
