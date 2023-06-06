import { Button, Stack } from '@mui/material';
import { Input,TextArea } from '../index';
const ContactForm = () => {
  return (
    <Stack
      direction="column"
      gap="32px"
      sx={{
        maxWidth: '675px',
        width: '100%',
        padding: '48px',
        backgroundColor:"#fff",
        borderRadius:"8px",
        zIndex:"100"
      }}
    >
      <Input title="Your Full Name *" />
      <Input title="Email Address *" />
      <Input title="Subject *" />
      <TextArea />
      <Button
        mt={4}
        variant="contained"
        sx={{ color: '#fff', p: '18px', borderRadius: '8px',marginTop:"1.5rem" }}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default ContactForm;
