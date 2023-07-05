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
  Checkbox,
} from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DpdInput, DpdRadio, SuccessModal } from '../../components';
import { STATES } from '../../talents';
const GENDER_OPTIONS = ['Female', 'Male', 'Prefer not to say'];
const SKILL_LEVEL = ['Beginner', 'Intermediate', 'Advanced'];
const PROGRAM = [
  'Software Development',
  'Product Management',
  'Product Design',
];
const OUTLET = ['Twitter', 'Newspaper', 'Slack', 'Email', 'Google', 'Others'];
const DpdsRegistration = () => {
  const pathname = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <Box component="section" className="container" py="32px">
      <Button
        sx={{
          color: '#363636',
          boxShadow: '0px 3px 8px 0 rgba(0, 0, 0, .24)',
          textTransform: 'capitalize',
        }}
        onClick={() => navigate('/government/dctp')}
      >
        Go back
      </Button>
      <Typography
        component="h2"
        fontWeight="700"
        fontSize={{ xs: '32px', md: '32px' }}
        color="text.black.100"
        mt="20px"
      >
        DevCareer Tech Program
      </Typography>
      <Stack color="text.grey.800" lineHeight="24px">
        <Typography
          component="p"
          mb="10px"
          mt="20px"
          fontSize={{ xs: '16px', md: '18px' }}
        >
          DevCareer Tech Program is a DevCareer initiative in partnership with
          UK-Nigeria Tech Hub. The program is geared towards newbie and
          intermediate-level techies who wish to take a big leap in their
          budding careers in the dynamic world of technology, at no cost.
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
  const navigate = useNavigate();
  const [disclaimer, setDisclaimer] = useState(false);
  const [region, setRegion] = useState('');
  const [lgas, setLgas] = useState([]);
  const [lgaValue, setLgaValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    'entry.1914094770': '',
    'entry.820092698': '',
    'entry.485719841': '',
    'entry.1803754267': '',
    'entry.700177539': '',
    'entry.1086331874': '',
    'entry.570590781': '',
    'entry.2071404193': '',
    'entry.636017523': '',
    'entry.1410941367': '',
    'entry.1635228319': '',
    'entry.1155039305': '',
    'entry.1070926144': '',
    'entry.325735402': '',
    'entry.2117309239': '',
    'entry.1432576111': '',
    'entry.661523532': '',
  });
  const [fieldValidity, setFieldValidity] = useState({
    emailVisited: false,
    firstNameVisited: false,
    lastNameVisited: false,
    phoneNumberVisited: false,
    genderVisited: false,
    skillVisited: false,
    stateVisited: false,
    lgaVisited: false,
    memberVisited: false,
    programVisited: false,
    reasonVisited: false,
    laptopVisited: false,
    commitmentVisited: false,
    outletVisited: false,
  });

  const triggerAllInputsOnSubmission = () => {
    setFieldValidity((prev) => {
      return {
        emailVisited: true,
        firstNameVisited: true,
        lastNameVisited: true,
        phoneNumberVisited: true,
        genderVisited: true,
        skillVisited: true,
        stateVisited: true,
        lgaVisited: true,
        memberVisited: true,
        programVisited: true,
        reasonVisited: true,
        laptopVisited: true,
        commitmentVisited: true,
        outletVisited: true,
      };
    });
  };
  const updateValidity = (name) => {
    setFieldValidity((prev) => {
      return {
        ...prev,
        [`${name}Visited`]: true,
      };
    });
  };
  const updateForm = (name, value) => {
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const {
    emailVisited,
    firstNameVisited,
    lastNameVisited,
    phoneNumberVisited,
    genderVisited,
    skillVisited,
    stateVisited,
    lgaVisited,
    memberVisited,
    programVisited,
    reasonVisited,
    laptopVisited,
    commitmentVisited,
    outletVisited,
  } = fieldValidity;

  const emailIsValid =
    formData['entry.1914094770'].includes('@') &&
    formData['entry.1914094770'].includes('.');
  const firstNameIsValid = formData['entry.820092698'] !== '';
  const lastNameIsValid = formData['entry.485719841'] !== '';
  const phoneNumberIsValid = formData['entry.1803754267'].length === 11;
  const genderIsValid = formData['entry.700177539'] !== '';
  const skillIsValid = formData['entry.1086331874'] !== '';
  const stateIsValid = formData['entry.570590781'] !== '';
  const lgaIsValid = formData['entry.2071404193'] !== '';
  const memberIsValid = formData['entry.636017523'] !== '';
  const programIsValid = formData['entry.1410941367'] !== '';
  const reasonIsValid =
    formData['entry.1635228319'] !== '' &&
    formData['entry.1635228319'].split(' ').length < 100;
  const laptopIsValid = formData['entry.1155039305'] !== '';
  const commitmentIsValid = formData['entry.1070926144'] !== '';
  const outletIsValid = formData['entry.1432576111'] !== '';
  const overallFormIsValid =
    emailIsValid &&
    firstNameIsValid &&
    lastNameIsValid &&
    phoneNumberIsValid &&
    genderIsValid &&
    skillIsValid &&
    stateIsValid &&
    lgaIsValid &&
    memberIsValid &&
    programIsValid &&
    reasonIsValid &&
    laptopIsValid &&
    commitmentIsValid &&
    outletIsValid;
  // Invalidity is a combination of a field being invalid and being touched, a field doesn't throw up any error even though it is invalid till it is touched.
  const emailIsInvalid = !emailIsValid && emailVisited;
  const firstNameIsInvalid = !firstNameIsValid && firstNameVisited;
  const lastNameIsInvalid = !lastNameIsValid && lastNameVisited;
  const phoneNumberIsInvalid = !phoneNumberIsValid && phoneNumberVisited;
  const genderIsInvalid = !genderIsValid && genderVisited;
  const skillIsInvalid = !skillIsValid && skillVisited;
  const stateIsInvalid = !stateIsValid && stateVisited;
  const lgaIsInvalid = !lgaIsValid && lgaVisited;
  const memberIsInvalid = !memberIsValid && memberVisited;
  const programIsInvalid = !programIsValid && programVisited;
  const reasonIsInvalid = !reasonIsValid && reasonVisited;
  const laptopIsInvalid = !laptopIsValid && laptopVisited;
  const commitmentIsInvalid = !commitmentIsValid && commitmentVisited;
  const outletIsInvalid = !outletIsValid && outletVisited;
  const handleDisclaimer = () => {
    setDisclaimer(!disclaimer);
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

  const submitHandler = (e) => {
    console.log(formData['entry.1635228319'].split(' ').length);
    e.preventDefault();
    triggerAllInputsOnSubmission();
    if (overallFormIsValid) {
      setIsSubmitting(true);
      fetch(
        'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdnAWEG75CMm878i9aZfSovudROP0-R6ghyHysb8KhKmCjcYw/formResponse',
        {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: finalData,
        }
      )
        .then((res) => {
          setIsSubmitting(false);
          setSubmitted(true);
          setError('');
          setTimeout(() => {
            navigate('/government/dctp');
          }, 7000);
        })
        .catch((err) => {
          setIsSubmitting(false);
          setError('Network Error, please retry');
          setTimeout(() => {
            setError('');
          }, 3000);
        });
    } else {
      window.scrollTo({ top: 300, behavior: 'smooth' });
      setError('Please ensure you fill all compulsory fields');
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  return (
    <Box component="form" mt="20px" onSubmit={submitHandler} ref={formRef}>
      <Stack gap="20px">
        <DpdInput
          label="Email Address"
          required="true"
          name="entry.1914094770"
          updateForm={updateForm}
          updateValidity={updateValidity}
          error={emailIsInvalid}
          id="email"
        />
        <DpdInput
          label="First Name"
          required="true"
          name="entry.820092698"
          updateForm={updateForm}
          updateValidity={updateValidity}
          error={firstNameIsInvalid}
          id="firstName"
        />
        <DpdInput
          label="Last Name"
          required="true"
          name="entry.485719841"
          updateForm={updateForm}
          updateValidity={updateValidity}
          error={lastNameIsInvalid}
          id="lastName"
        />
        <DpdInput
          label="Phone Number"
          required="true"
          type="number"
          name="entry.1803754267"
          updateForm={updateForm}
          updateValidity={updateValidity}
          error={phoneNumberIsInvalid}
          id="phoneNumber"
        />
        <DpdRadio
          label="GENDER"
          options={GENDER_OPTIONS}
          required="true"
          titleColor="#888"
          name="entry.700177539"
          updateForm={updateForm}
          error={genderIsInvalid}
        />
        <DpdRadio
          label="SKILL LEVEL"
          options={SKILL_LEVEL}
          required="true"
          titleColor="#888"
          name="entry.1086331874"
          updateForm={updateForm}
          error={skillIsInvalid}
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
                name="entry.570590781"
                label="State of Residence"
                error={stateIsInvalid}
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
                name="entry.2071404193"
                label="Local Government Areas"
                error={lgaIsInvalid}
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
        <FormControl error={memberIsInvalid}>
          <FormLabel sx={{ color: '#181818', fontWeight: 700 }}>
            Are you a member of DevCareer Africa Community?
            <Typography component="span" color="#CB2B11">
              *
            </Typography>
          </FormLabel>

          <RadioGroup
            name="entry.636017523"
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
          name="entry.1410941367"
          updateForm={updateForm}
          error={programIsInvalid}
        />
        <DpdInput
          label="What makes you an ideal candidate for this program? - 100 words "
          id="reason"
          required="true"
          multiline="true"
          name="entry.1635228319"
          updateForm={updateForm}
          error={reasonIsInvalid}
          updateValidity={updateValidity}
          // errorMessage={reasonIsInvalid ? 'Must be less than 100 words' : ''}
        />
        <DpdRadio
          label="Do you have a laptop?"
          titleColor="#181818"
          required="true"
          options={['Yes', 'No']}
          name="entry.1155039305"
          updateForm={updateForm}
          error={laptopIsInvalid}
        />
        <DpdRadio
          label="Are you willing to commit 6 hours per week to the program?"
          titleColor="#181818"
          required="true"
          options={['Yes', 'No']}
          name="entry.1070926144"
          updateForm={updateForm}
          error={commitmentIsInvalid}
        />

        <DpdInput
          label="Link to Github profile or Personal portfolio"
          name="entry.325735402"
          updateForm={updateForm}
        />
        <DpdInput
          label="Link to your LinkedIn Profile"
          name="entry.2117309239"
          updateForm={updateForm}
        />
        <DpdRadio
          label="How did you hear of this program?"
          titleColor="#181818"
          required="true"
          options={OUTLET}
          name="entry.1432576111"
          updateForm={updateForm}
          error={outletIsInvalid}
        />
        <DpdInput
          label="Do you have any final thoughts or feedback on this application you'd like to share?"
          multiline="true"
          name="entry.661523532"
          updateForm={updateForm}
        />
      </Stack>
      <Stack direction="row" mt="50px" >
        <FormControlLabel
          required
          control={<Checkbox onClick={handleDisclaimer} />}
          label=" We take your privacy seriously. By submitting this form, you acknowledge and agree that your data may be shared with our trusted partners and third-party service providers."
        />
      </Stack>
      <Button
        disabled={!disclaimer}
        onClick={submitHandler}
        fontWeight="500"
        fontSize="20px"
        variant="outlined"
        sx={{
          opacity: `${isSubmitting ? '0.3' : '1'}`,
          py: '20px',
          borderRadius: '8px',
          color: '#FEFEFE',
          bgcolor: 'primary.main',
          mt: '72px',
          width: { xs: '100%', md: '50%' },
          '&:hover': {
            bgcolor: 'primary.main',
          },
          '&:disabled': {
            backgroundColor: '#e0e0e0',
          },
        }}
      >
        Enroll into Program
      </Button>
      {error && (
        <Typography
          position="fixed"
          bgcolor="#F99989"
          bottom="20px"
          right="10%"
          fontWeight="700"
          fontSize={{ xs: '14px', md: '18px' }}
          borderRadius="5px"
          py="15px"
          px="15px"
          color="#FFF"
          sx={{ animation: 'error 3s forwards' }}
        >
          {error}
        </Typography>
      )}
      {submitted && <SuccessModal />}
    </Box>
  );
};
