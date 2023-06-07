import {
  Typography,
  Box,
  Stack,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
} from '@mui/material';
import React, { useState } from 'react';
import { DpdInput, DpdRadio } from '../../components';

const DpdsRegistration = () => {
  return (
    <Box component="section" className="container" py="32px">
      <Typography
        component="h2"
        fontWeight="700"
        fontSize={{ xs: '32px', md: '32px' }}
        color="text.black.100"
      >
        Design Product Developers School
      </Typography>
      <Stack color="text.grey.800" lineHeight="24px">
        <Typography
          component="p"
          mb="10px"
          mt="20px"
          fontSize={{ xs: '16px', md: '18px' }}
        >
          Design Product and Developers School is a DevCareer initiative in
          partnership with UK-Nigeria Tech Hub. The program is geared towards
          newbie and intermediate-level techies who wish to take a big leap in
          their budding careers in the dynamic world of technology, at no cost.
        </Typography>
        <Stack
          component="ul"
          pl="24px"
          mb="10px"
          fontSize={{ xs: '16px', md: '18px' }}
        >
          <Typography component="li" fontSize={{ xs: '16px', md: '18px' }}>
            Software Development
          </Typography>
          <Typography component="li" fontSize={{ xs: '16px', md: '18px' }}>
            Product Management
          </Typography>
          <Typography component="li" fontSize={{ xs: '16px', md: '18px' }}>
            Product Design
          </Typography>
        </Stack>
        <Typography
          component="p"
          mb="20px"
          fontSize={{ xs: '16px', md: '18px' }}
        >
          In this program, participants will enter into a guided learning at an
          average of 15hour/week commitment level. The component of the 6-month
          long program is 100% virtual; think of workshops, live classes, peer
          learning sessions, LMS, mentorship etc.
        </Typography>
        <Typography
          component="p"
          mb="20px"
          fontSize={{ xs: '16px', md: '18px' }}
        >
          Task-based approach to learning will be employed as such assessment,
          quizzes, tests, and projects will be conducted at healthy intervals.
        </Typography>
        <Typography
          component="p"
          fontWeight="700"
          fontSize={{ xs: '16px', md: '20px' }}
        >
          Note - This application is open to only Nigeria-resident.
        </Typography>
      </Stack>
      <DpdsForm />
    </Box>
  );
};

export default DpdsRegistration;

const DpdsForm = () => {
  const GENDER_OPTIONS = ['Female', 'Male', 'Prefer not to say'];
  const SKILL_LEVEL = ['Beginner', 'Intermediate', 'Advanced'];
  const PROGRAM = [
    'Software Development',
    'Product Management',
    'Product Design',
  ];
  const [value, setValue] = useState('');
  console.log(value);
  return (
    <Box component="form" mt="20px">
      <Stack gap="20px">
        <DpdInput label="Email Address" required="true" />
        <DpdInput label="First Name" required="true" />
        <DpdInput label="Surname" required="true" />
        <DpdRadio
          label="GENDER"
          options={GENDER_OPTIONS}
          required="true"
          titleColor="#888"
        />
        <DpdRadio
          label="SKILL LEVEL"
          options={SKILL_LEVEL}
          required="true"
          titleColor="#888"
        />
        <Stack>
          <Typography sx={{ fontWeight: '700', color: '#888' }} mb="8px">
            RESIDENTIAL INFORMATION
            <Typography component="span" color="#CB2B11">
              *
            </Typography>
          </Typography>
          <Stack gap="24px">
            <FormControl>
              <InputLabel
                sx={{ fontWeight: '700', color: 'text.grey.800', mb: '8px' }}
              >
                State of Residence
              </InputLabel>
              <Select
                onChange={(e) => setValue(e.target.value)}
                value={value}
                name="state"
                label="State of Residence"
              >
                <MenuItem value="oyo">Oyo State</MenuItem>
                <MenuItem value="osun">Osun State</MenuItem>
                <MenuItem value="lagos">Lagos State</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel
                sx={{ fontWeight: '700', color: 'text.grey.800', mb: '8px' }}
              >
                Local Government Area
              </InputLabel>
              <Select
                onChange={(e) => setValue(e.target.value)}
                value={value}
                name="state"
                label="State of Residence"
              >
                <MenuItem value="oyo">Oyo State</MenuItem>
                <MenuItem value="osun">Osun State</MenuItem>
                <MenuItem value="lagos">Lagos State</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>
        <FormControl>
          <FormLabel sx={{ color: '#181818', fontWeight: 700 }}>
            Are you a member of DevCareer Africa Community?
            <Typography component="span" color="#CB2B11">
              *
            </Typography>
          </FormLabel>
          <Typography>
            (if no, signup here
            <Typography
              color="#1E6091"
              component="a"
              href="https://docs.google.com/forms/d/e/1FAIpQLSfdp21O60omVRDUGReslAAbwQeAXLeRasvL3G6S-VN8qbt2gg/viewform"
              target="_blank"
            >
              bit.ly/devcareerafrica
            </Typography>
            )
          </Typography>
          <RadioGroup name="member">
            {['Yes', 'No'].map((opt) => (
              <FormControlLabel
                sx={{ color: '#363636', fontWeight: 500 }}
                key={opt}
                value={opt}
                control={<Radio />}
                label={opt}
              />
            ))}
          </RadioGroup>
        </FormControl>
        <DpdRadio
          label="What program are you signing up for?"
          titleColor="#181818"
          required="true"
          options={PROGRAM}
        />
        <DpdInput
          label="What makes you an ideal candidate for this program? "
          required="true"
          multiline="true"
        />
        <DpdInput label="Link to Github profile" />
        <DpdInput label="Link to Personal Website or Portfolio" />
        <DpdInput
          label="Do you have any final thoughts or feedback on this application you'd like to share?"
          multiline="true"
        />
      </Stack>
      <Button
        fontWeight="500"
        fontSize="20px"
        variant="outlined"
        sx={{
          py: '20px',
          borderRadius: '8px',
          color: '#FEFEFE',
          bgcolor: 'primary.main',
          mt: '72px',
          width: { xs: '100%', md: '50%' },
        }}
      >
        Enroll into Program
      </Button>
    </Box>
  );
};
// (if no, signup here bit.ly/devcareerafrica)"
