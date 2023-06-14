import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Input, TextArea } from '../index';
const ContactForm = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    purpose: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://formsubmit.co/ajax/support@devcareer.io',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(form),
        }
      );
      const data = await response.json();
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setForm({
        fullName: '',
        email: '',
        purpose: '',
        subject: '',
        message: '',
      });
    }
  };
  return (
    <Stack
      direction="column"
      gap="32px"
      sx={{
        maxWidth: '675px',
        width: '100%',
        padding: { xs: '28px', lg: '48px' },
        backgroundColor: '#fff',
        borderRadius: '8px',
        zIndex: '100',
      }}
    >
      <Input
        name="fullName"
        title="Your Full Name *"
        value={form.fullName}
        onChange={handleChange}
      />
      <Input
        name="email"
        title="Email Address *"
        value={form.email}
        onChange={handleChange}
      />
      <Box>
        <InputLabel
          sx={{ fontWeight: '700', color: 'text.grey.800', mb: '8px' }}
        >
          Purpose *
        </InputLabel>
        <Select
          sx={{ width: '100%' }}
          name="purpose"
          value={form.purpose}
          onChange={handleChange}
        >
          <MenuItem value="Hire Talents(s) for Project">Hire Talents(s) for Project</MenuItem>
          <MenuItem value="Offer to Support">Offer to Support</MenuItem>
          <MenuItem value="Report an Incident">Report an Incident</MenuItem>
          <MenuItem value="Volunteer">Volunteer</MenuItem>
          <MenuItem value="Inquiry">Inquiry</MenuItem>
        </Select>
      </Box>
      <Input
        name="subject"
        value={form.subject}
        title="Subject *"
        onChange={handleChange}
      />
      <TextArea name="message" value={form.message} onChange={handleChange} />
      <Button
        onClick={handleSubmit}
        mt={4}
        variant="contained"
        sx={{
          color: '#fff',
          p: '18px',
          borderRadius: '8px',
          marginTop: '1.5rem',
        }}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default ContactForm;
