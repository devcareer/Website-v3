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
import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DpdInput, DpdRadio } from '../../components';
import { STATES } from '../../talents';
const GENDER_OPTIONS = ['Female', 'Male', 'Prefer not to say'];
const SKILL_LEVEL = ['Beginner', 'Intermediate', 'Advanced'];
const PROGRAM = [
  'Software Development',
  'Product Management',
  'Product Design',
];

const DpdsRegistration = () => {
  const pathname = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
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
  const [region, setRegion] = useState('');
  const [lgas, setLgas] = useState([]);
  const [lgaValue, setLgaValue] = useState('');
  const formRef = useRef();
  const [, /* formData */ setFormData] = useState({
    'entry.855600301': '',
    'entry.302085708': '',
    'entry.2026273917': '',
    'entry.462203312': '',
    'entry.131866439': '',
    'entry.1385017411': '',
    'entry.6471839': '',
    'entry.1595139557': '',
    'entry.693379647': '',
    'entry.837946097': '',
    'entry.2130690014': '',
    'entry.1409330216': '',
    'entry.1771650248': '',
  });

  const updateForm = (name, value) => {
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    const selectedState = STATES.find((state) => state.name === e.target.value);
    setLgas(selectedState.lgas);
    updateForm(e.target.name, e.target.value);
  };

  const lgaChangeHandler = (e) => {
    setLgaValue(e.target.value);
    updateForm(e.target.name, e.target.value);
  };
  const finalData = new FormData(formRef.current);
  const submitHandler = () => {
    console.log('Submission triggered');
    fetch(
      'https://docs.google.com/forms/u/0/d/e/1FAIpQLScwSwZ0Gu1Xkj115pjePML7ufrG5LnxgdYmBuWkAPnOGdP8BQ/formResponse',
      {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: finalData,
      }
    ).then((res) => {
      if (res.ok) console.log('Data succesfully submitted');
      else console.log('Data wasnt submitted');
    });
  };
  return (
    <Box component="form" mt="20px" onSubmit={submitHandler} ref={formRef}>
      <Stack gap="20px">
        <DpdInput
          label="Email Address"
          required="true"
          name="entry.855600301"
          updateForm={updateForm}
        />
        <DpdInput
          label="First Name"
          required="true"
          name="entry.2026273917"
          updateForm={updateForm}
        />
        <DpdInput
          label="Surname"
          required="true"
          name="entry.302085708"
          updateForm={updateForm}
        />
        <DpdRadio
          label="GENDER"
          options={GENDER_OPTIONS}
          required="true"
          titleColor="#888"
          name="entry.462203312"
          updateForm={updateForm}
        />
        <DpdRadio
          label="SKILL LEVEL"
          options={SKILL_LEVEL}
          required="true"
          titleColor="#888"
          name="entry.131866439"
          updateForm={updateForm}
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
                onChange={handleRegionChange}
                value={region}
                name="entry.1385017411"
                label="State of Residence"
              >
                {STATES.map((state, i) => (
                  <MenuItem key={i} value={state.name}>
                    {state.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel
                sx={{ fontWeight: '700', color: 'text.grey.800', mb: '8px' }}
              >
                Local Government Areas
              </InputLabel>
              <Select
                onChange={lgaChangeHandler}
                value={lgaValue}
                name="entry.6471839"
                label="Local Government Areas"
              >
                {lgas.map((lga, i) => (
                  <MenuItem value={lga} key={i}>
                    {lga}
                  </MenuItem>
                ))}
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
          <RadioGroup
            name="entry.1595139557"
            onChange={(e) => updateForm(e.target.name, e.target.value)}
          >
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
          name="entry.693379647"
          updateForm={updateForm}
        />
        <DpdInput
          label="What makes you an ideal candidate for this program? "
          required="true"
          multiline="true"
          name="entry.837946097"
          updateForm={updateForm}
        />
        <DpdInput
          label="Link to Github profile"
          name="entry.2130690014"
          updateForm={updateForm}
        />
        <DpdInput
          label="Link to Personal Website or Portfolio"
          name="entry.1409330216"
          updateForm={updateForm}
        />
        <DpdInput
          label="Do you have any final thoughts or feedback on this application you'd like to share?"
          multiline="true"
          name="entry.1771650248"
          updateForm={updateForm}
        />
      </Stack>
      <Button
        onClick={submitHandler}
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
          '&:hover': {
            bgcolor: 'primary.main',
          },
        }}
      >
        Enroll into Program
      </Button>
    </Box>
  );
};
