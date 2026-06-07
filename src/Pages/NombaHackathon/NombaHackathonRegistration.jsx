import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { toast } from 'react-toastify';
import './NombaHackathonRegistration.css';
import {
  getFocusOptionsForTrack,
  parseTrackPrefillFromSearch,
  TRACK_CATEGORY_OPTIONS,
} from './nombaTracksData';

gsap.registerPlugin(useGSAP, SplitText);

const FORM_ENDPOINT =
  import.meta.env.VITE_NOMBA_HACKATHON_FORM_URL ||
  '/api/nomba-hackathon/registrations';
const VERIFY_ENDPOINT = `${FORM_ENDPOINT.replace(/\/$/, '')}/verify`;

const ROLE_OPTIONS = [
  'Frontend Engineer',
  'Backend Engineer',
  'Product Designer',
  'Product Manager',
  'Full-Stack Engineer',
  'Other',
];

const EXPERIENCE_LEVELS = ['Beginner (0-1 years)', 'Intermediate (1-3 years)', 'Advanced (3-5 years)', 'Expert (5+ years)'];
const NIGERIAN_STATES = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'FCT',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
];

const NombaHackathonRegistration = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const rootRef = useRef(null);
  const prefilledSelection = useMemo(() => parseTrackPrefillFromSearch(search), [search]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('.nmr-reveal', { autoAlpha: 1, y: 0 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set('.nmr-reveal', { autoAlpha: 0, y: 20 });
        gsap.to('.nmr-reveal', {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
        });

        const splitTitle = SplitText.create('.nmr-hero__title', { type: 'words,chars' });
        gsap.from(splitTitle.chars, {
          autoAlpha: 0,
          yPercent: 115,
          duration: 0.7,
          stagger: 0.014,
          ease: 'power3.out',
        });

        return () => {
          splitTitle.revert();
        };
      });

      return () => {
        mm.revert();
      };
    },
    { scope: rootRef }
  );

  if (isSubmitted) {
    return <SuccessScreen name={submittedName} navigate={navigate} />;
  }

  return (
    <Box className="nmr-page" ref={rootRef}>
      <Box className="nmr-hero">
        <Box className="nmr-hero__content">
          <Link to="/programs/nomba-hackathon" style={{ textDecoration: 'none' }}>
            <Button className="nmr-back-btn">← Back to Nomba Hackathon</Button>
          </Link>
          <Typography className="nmr-hero__title">Register For Nomba Forward Hackathon 2026</Typography>
          <Typography className="nmr-hero__subtitle nmr-reveal">
            Registration closes on June 23, 2026. Choose your primary track and focus area to secure
            onboarding and training access.
          </Typography>
        </Box>
      </Box>

      <Box className="nmr-form-wrap nmr-reveal">
        <RegistrationForm
          prefilledSelection={prefilledSelection}
          onSuccess={(name) => {
            setSubmittedName(name);
            setIsSubmitted(true);
          }}
        />
      </Box>
    </Box>
  );
};

const RegistrationForm = ({ onSuccess, prefilledSelection }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationRequest, setVerificationRequest] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const initialValues = useMemo(
    () => ({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      state: '',
      participationMode: '',
      teamName: '',
      teamSize: '',
      track: prefilledSelection?.track || '',
      focusArea: prefilledSelection?.focusArea || '',
      role: '',
      experienceLevel: '',
      consentOriginality: false,
      consentCommitment: false,
    }),
    [prefilledSelection]
  );

  const validate = (values) => {
    const errors = {};
    const emailRegex = /^\s*([^\s@]+)@([^\s@]+\.[^\s@]+)\s*$/;
    const allowedFocusOptions = getFocusOptionsForTrack(values.track);

    if (!values.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    if (!values.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    if (!emailRegex.test(values.email)) {
      errors.email = 'Enter a valid email address';
    }
    if (!values.phone.trim()) {
      errors.phone = 'Phone number is required';
    }
    if (!values.state) {
      errors.state = 'Please select your Nigerian state';
    }
    if (!values.participationMode) {
      errors.participationMode = 'Select solo or team participation';
    }
    if (values.participationMode === 'Team') {
      if (!values.teamName.trim()) {
        errors.teamName = 'Team name is required for team participation';
      }
      if (!values.teamSize) {
        errors.teamSize = 'Select team size';
      }
    }
    if (!values.track) {
      errors.track = 'Please select a primary focus track';
    }
    if (!values.focusArea) {
      errors.focusArea = 'Please select a specific focus area';
    } else if (values.track && !allowedFocusOptions.includes(values.focusArea)) {
      errors.focusArea = 'Select a focus area that belongs to the selected track';
    }
    if (!values.role) {
      errors.role = 'Please select your primary role';
    }
    if (!values.experienceLevel) {
      errors.experienceLevel = 'Please select your experience level';
    }
    if (!values.consentOriginality) {
      errors.consentOriginality = 'You must agree to originality requirements';
    }
    return errors;
  };

  const requestVerificationCode = async (formValues) => {
    setIsSubmitting(true);

    const payload = {
      program: 'Nomba Forward Hackathon 2026',
      submittedAt: new Date().toISOString(),
      ...formValues,
    };

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.verificationRequired) {
        throw new Error(result?.error || 'Verification request failed');
      }

      setVerificationRequest({
        email: result.email,
        expiresAt: result.expiresAt,
      });
      setVerificationCode('');
      toast.success('We sent a 6-digit verification code to your email.', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    } catch (error) {
      toast.error('Unable to send verification code right now. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    enableReinitialize: true,
    validate,
    onSubmit: requestVerificationCode,
  });

  const focusOptions = useMemo(() => getFocusOptionsForTrack(values.track), [values.track]);

  const handleTrackChange = (event) => {
    const selectedTrack = event.target.value;
    const nextFocusOptions = getFocusOptionsForTrack(selectedTrack);

    setFieldValue('track', selectedTrack);

    if (!nextFocusOptions.includes(values.focusArea)) {
      setFieldValue('focusArea', '');
    }
  };

  const handleVerifyCode = async (event) => {
    event.preventDefault();

    if (!verificationRequest || !/^\d{6}$/.test(verificationCode)) {
      toast.error('Enter the 6-digit code sent to your email.', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
      return;
    }

    setIsVerifying(true);

    try {
      const response = await fetch(VERIFY_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: verificationRequest.email,
          code: verificationCode,
        }),
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        throw new Error(result?.error || 'Verification failed');
      }

      onSuccess(values.firstName);
    } catch (error) {
      toast.error(error.message || 'Unable to verify registration right now. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const fieldStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: '#fffef9',
      '&:hover fieldset': {
        borderColor: '#f2bf00',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#d4a600',
      },
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#7a6400',
    },
  };

  if (verificationRequest) {
    return (
      <VerificationStep
        email={verificationRequest.email}
        expiresAt={verificationRequest.expiresAt}
        code={verificationCode}
        onCodeChange={setVerificationCode}
        onSubmit={handleVerifyCode}
        onResend={() => requestVerificationCode(values)}
        onEdit={() => {
          setVerificationRequest(null);
          setVerificationCode('');
        }}
        isResending={isSubmitting}
        isVerifying={isVerifying}
        fieldStyle={fieldStyle}
      />
    );
  }

  return (
    <Box className="nmr-form" component="form" onSubmit={handleSubmit} noValidate>
      <Typography className="nmr-form__title">Personal Details</Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} gap={2.2}>
        <TextField
          fullWidth
          required
          sx={fieldStyle}
          label="First Name"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.firstName && Boolean(errors.firstName)}
          helperText={touched.firstName && errors.firstName}
        />
        <TextField
          fullWidth
          required
          sx={fieldStyle}
          label="Last Name"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.lastName && Boolean(errors.lastName)}
          helperText={touched.lastName && errors.lastName}
        />
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} gap={2.2}>
        <TextField
          fullWidth
          required
          sx={fieldStyle}
          label="Email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
        <TextField
          fullWidth
          required
          sx={fieldStyle}
          label="Phone Number"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.phone && Boolean(errors.phone)}
          helperText={touched.phone && errors.phone}
        />
      </Stack>

      <FormControl fullWidth required sx={fieldStyle} error={touched.state && Boolean(errors.state)}>
        <InputLabel>State in Nigeria</InputLabel>
        <Select
          name="state"
          label="State in Nigeria"
          value={values.state}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          {NIGERIAN_STATES.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>
        {touched.state && errors.state && <Typography className="nmr-error">{errors.state}</Typography>}
      </FormControl>

      <Typography className="nmr-form__title">Participation Details</Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} gap={2.2}>
        <FormControl fullWidth required sx={fieldStyle} error={touched.participationMode && Boolean(errors.participationMode)}>
          <InputLabel>Participation Mode</InputLabel>
          <Select
            name="participationMode"
            label="Participation Mode"
            value={values.participationMode}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <MenuItem value="Solo">Solo</MenuItem>
            <MenuItem value="Team">Team</MenuItem>
          </Select>
          {touched.participationMode && errors.participationMode && (
            <Typography className="nmr-error">{errors.participationMode}</Typography>
          )}
        </FormControl>

        <TextField
          fullWidth
          sx={fieldStyle}
          label="Team Name (if team)"
          name="teamName"
          value={values.teamName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.teamName && Boolean(errors.teamName)}
          helperText={touched.teamName && errors.teamName}
        />
      </Stack>

      {values.participationMode === 'Team' && (
        <FormControl fullWidth required sx={fieldStyle} error={touched.teamSize && Boolean(errors.teamSize)}>
          <InputLabel>Team Size</InputLabel>
          <Select
            name="teamSize"
            label="Team Size"
            value={values.teamSize}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
          </Select>
          {touched.teamSize && errors.teamSize && <Typography className="nmr-error">{errors.teamSize}</Typography>}
        </FormControl>
      )}

      <Stack direction={{ xs: 'column', md: 'row' }} gap={2.2}>
        <FormControl fullWidth required sx={fieldStyle} error={touched.track && Boolean(errors.track)}>
          <InputLabel>Track Category</InputLabel>
          <Select
            name="track"
            label="Track Category"
            value={values.track}
            onChange={handleTrackChange}
            onBlur={handleBlur}
          >
            {TRACK_CATEGORY_OPTIONS.map((track) => (
              <MenuItem key={track} value={track}>
                {track}
              </MenuItem>
            ))}
          </Select>
          {touched.track && errors.track && <Typography className="nmr-error">{errors.track}</Typography>}
        </FormControl>

        <FormControl fullWidth required sx={fieldStyle} error={touched.focusArea && Boolean(errors.focusArea)}>
          <InputLabel>Focus Area</InputLabel>
          <Select
            name="focusArea"
            label="Focus Area"
            value={values.focusArea}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!values.track}
          >
            {focusOptions.map((focus) => (
              <MenuItem key={focus} value={focus}>
                {focus}
              </MenuItem>
            ))}
          </Select>
          {touched.focusArea && errors.focusArea && <Typography className="nmr-error">{errors.focusArea}</Typography>}
          {!values.track && <Typography className="nmr-help">Select a track first to see its focus areas.</Typography>}
        </FormControl>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} gap={2.2}>
        <FormControl fullWidth required sx={fieldStyle} error={touched.role && Boolean(errors.role)}>
          <InputLabel>Primary Role</InputLabel>
          <Select name="role" label="Primary Role" value={values.role} onChange={handleChange} onBlur={handleBlur}>
            {ROLE_OPTIONS.map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
          {touched.role && errors.role && <Typography className="nmr-error">{errors.role}</Typography>}
        </FormControl>

        <FormControl fullWidth required sx={fieldStyle} error={touched.experienceLevel && Boolean(errors.experienceLevel)}>
          <InputLabel>Experience Level</InputLabel>
          <Select
            name="experienceLevel"
            label="Experience Level"
            value={values.experienceLevel}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {EXPERIENCE_LEVELS.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </Select>
          {touched.experienceLevel && errors.experienceLevel && (
            <Typography className="nmr-error">{errors.experienceLevel}</Typography>
          )}
        </FormControl>
      </Stack>

      <Box className="nmr-consent-box">
        <FormControlLabel
          control={
            <Checkbox
              checked={values.consentOriginality}
              onChange={(event) => setFieldValue('consentOriginality', event.target.checked)}
              name="consentOriginality"
            />
          }
          label="I confirm this submission and project work will be original and built within the official timeline."
        />
        {touched.consentOriginality && errors.consentOriginality && (
          <Typography className="nmr-error">{errors.consentOriginality}</Typography>
        )}
      </Box>

      <LoadingButton type="submit" loading={isSubmitting} className="nmr-submit" variant="contained" disableElevation>
        {isSubmitting ? 'Submitting...' : 'Submit Registration'}
      </LoadingButton>
    </Box>
  );
};

const VerificationStep = ({
  email,
  expiresAt,
  code,
  onCodeChange,
  onSubmit,
  onResend,
  onEdit,
  isResending,
  isVerifying,
  fieldStyle,
}) => (
  <Box className="nmr-form nmr-verification" component="form" onSubmit={onSubmit} noValidate>
    <Typography className="nmr-form__title">Confirm Your Email</Typography>
    <Typography className="nmr-verification__copy">
      We sent a 6-digit code to <strong>{email}</strong>. Enter it below to complete your registration.
    </Typography>
    {expiresAt && (
      <Typography className="nmr-verification__meta">
        Code expires at {new Intl.DateTimeFormat('en-GB', { timeStyle: 'short' }).format(new Date(expiresAt))}.
      </Typography>
    )}

    <TextField
      fullWidth
      required
      sx={fieldStyle}
      label="Verification Code"
      name="verificationCode"
      value={code}
      onChange={(event) => onCodeChange(event.target.value.replace(/\D/g, '').slice(0, 6))}
      inputProps={{ inputMode: 'numeric', maxLength: 6 }}
      helperText="Use the 6-digit code from your email."
    />

    <Stack direction={{ xs: 'column', sm: 'row' }} gap={1.5}>
      <LoadingButton
        type="submit"
        loading={isVerifying}
        className="nmr-submit"
        variant="contained"
        disableElevation
        fullWidth
      >
        Verify & Complete Registration
      </LoadingButton>
      <LoadingButton
        type="button"
        loading={isResending}
        className="nmr-secondary-btn"
        variant="outlined"
        onClick={onResend}
        fullWidth
      >
        Resend Code
      </LoadingButton>
    </Stack>

    <Button type="button" className="nmr-edit-btn" onClick={onEdit}>
      Edit registration details
    </Button>
  </Box>
);

const SuccessScreen = ({ name, navigate }) => {
  return (
    <Box className="nmr-success">
      <Box className="nmr-success__card">
        <Typography className="nmr-success__emoji">🎉</Typography>
        <Typography className="nmr-success__title">Registration Successful{name ? `, ${name}` : ''}!</Typography>
        <Typography className="nmr-success__subtitle">
          You are now on the list for Nomba Forward Hackathon 2026. Watch your inbox for onboarding details before June 24, 2026.
        </Typography>

        <Box className="nmr-success__timeline">
          <p>
            <strong>Registration:</strong> June 8 - 23, 2026
          </p>
          <p>
            <strong>Onboarding:</strong> June 24 - 29, 2026
          </p>
          <p>
            <strong>Build Sprint:</strong> July 1 - 7, 2026
          </p>
          <p>
            <strong>Validation & Judging:</strong> July 8 - 14, 2026
          </p>
          <p>
            <strong>Demo Day:</strong> July 19, 2026
          </p>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} gap={1.5} justifyContent="center">
          <Button className="nmr-success__btn" onClick={() => navigate('/programs/nomba-hackathon')}>
            Back To Hackathon Page
          </Button>
          <Button
            className="nmr-success__btn nmr-success__btn--outline"
            href="https://developer.nomba.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore Nomba API Docs
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default NombaHackathonRegistration;
