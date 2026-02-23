import React, { useState, useEffect, useMemo } from 'react';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Typography,
    TextField,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import countryList from 'react-select-country-list';
import { LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import './RaenestHackathonRegistration.css';

const TRACKS = [
    'Design',
    'Writing / Content Creation',
    'Coding / Development',
];

const EXPERIENCE_LEVELS = [
    'Beginner (0–1 years)',
    'Intermediate (1–3 years)',
    'Advanced (3–5 years)',
    'Expert (5+ years)',
];

const RaenestHackathonRegistration = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedName, setSubmittedName] = useState('');

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [pathname]);

    if (isSubmitted) {
        return <SuccessScreen name={submittedName} navigate={navigate} />;
    }

    return (
        <Box className="rn-reg">
            <Box className="rn-reg__hero">
                <Box className="rn-reg__hero-content">
                    <Button
                        className="rn-reg__back-btn"
                        onClick={() => navigate('/programs/raenest-hackathon')}
                    >
                        ← Back to Hackathon
                    </Button>
                    <Typography className="rn-reg__hero-title" component="h1">
                        Join the Raenest Hackathon
                    </Typography>
                    <Typography className="rn-reg__hero-subtitle">
                        Fill in your details below to register. It only takes a minute.
                    </Typography>
                </Box>
            </Box>
            <Box className="rn-reg__form-wrapper">
                <RegistrationForm
                    navigate={navigate}
                    onSuccess={(name) => {
                        setSubmittedName(name);
                        setIsSubmitted(true);
                    }}
                />
            </Box>
        </Box>
    );
};

export default RaenestHackathonRegistration;

const RegistrationForm = ({ navigate, onSuccess }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const COUNTRY_ARRAY = useMemo(() => countryList().getData(), []);

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        track: '',
        experienceLevel: '',
        upworkProfile: '',
        raenestAccount: '',
        portfolioLink: '',
    };

    const validate = (values) => {
        const emailRegex = /^\s*([^\s@]+)@([^\s@]+\.[^\s@]+)\s*$/;
        const errors = {};

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
        if (!values.country) {
            errors.country = 'Please select your country';
        }
        if (!values.track) {
            errors.track = 'Please select a track';
        }
        if (!values.experienceLevel) {
            errors.experienceLevel = 'Please select your experience level';
        }
        if (!values.raenestAccount.trim()) {
            errors.raenestAccount = 'Raenest username or email is required';
        }
        return errors;
    };

    const {
        handleChange,
        handleBlur,
        touched,
        values,
        errors,
        handleSubmit,
    } = useFormik({
        initialValues,
        validate,
        onSubmit: async (values) => {
            setIsSubmitting(true);

            const DATA = new FormData();
            DATA.append('firstName', values.firstName);
            DATA.append('lastName', values.lastName);
            DATA.append('email', values.email);
            DATA.append('phone', values.phone);
            DATA.append('country', values.country);
            DATA.append('track', values.track);
            DATA.append('experienceLevel', values.experienceLevel);
            DATA.append('upworkProfile', values.upworkProfile);
            DATA.append('raenestAccount', values.raenestAccount);
            DATA.append('portfolioLink', values.portfolioLink);

            try {
                await fetch('https://script.google.com/macros/s/AKfycbx70l90dyjLM4yLYE-NRWk5RXyBfItSFtBZOTR91_8OMEAG8G9NxAk-pNomTDHrgh9u/exec', {
                    method: 'POST',
                    body: DATA,
                });

                window.scrollTo({ top: 0 });
                onSuccess(values.firstName);
            } catch (err) {
                toast.error('Network error. Please try again.', {
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
        },
    });

    const fieldStyle = {
        '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            backgroundColor: '#fafafa',
            '&:hover fieldset': { borderColor: '#6c5ce7' },
            '&.Mui-focused fieldset': { borderColor: '#6c5ce7' },
        },
        '& .MuiInputLabel-root.Mui-focused': { color: '#6c5ce7' },
    };

    return (
        <Box className="rn-reg__form" component="form" onSubmit={handleSubmit} noValidate>
            <Typography className="rn-reg__form-section-title">
                Personal Information
            </Typography>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                <TextField
                    label="First Name"
                    name="firstName"
                    required
                    fullWidth
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    sx={fieldStyle}
                />
                <TextField
                    label="Last Name"
                    name="lastName"
                    required
                    fullWidth
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    sx={fieldStyle}
                />
            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                <TextField
                    label="Email Address"
                    name="email"
                    type="email"
                    required
                    fullWidth
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={fieldStyle}
                />
                <TextField
                    label="Phone Number"
                    name="phone"
                    required
                    fullWidth
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                    sx={fieldStyle}
                />
            </Stack>

            <FormControl fullWidth error={touched.country && Boolean(errors.country)} sx={fieldStyle}>
                <InputLabel>Country</InputLabel>
                <Select
                    name="country"
                    label="Country"
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ borderRadius: '12px' }}
                >
                    {COUNTRY_ARRAY?.map((c, i) => (
                        <MenuItem key={i} value={c.label}>
                            {c.label}
                        </MenuItem>
                    ))}
                </Select>
                {touched.country && errors.country && (
                    <Typography sx={{ color: '#d32f2f', fontSize: '0.75rem', mt: '3px', ml: '14px' }}>
                        {errors.country}
                    </Typography>
                )}
            </FormControl>

            <Typography className="rn-reg__form-section-title" sx={{ mt: '16px !important' }}>
                Hackathon Details
            </Typography>

            <FormControl fullWidth required error={touched.track && Boolean(errors.track)} sx={fieldStyle}>
                <InputLabel>Preferred Track</InputLabel>
                <Select
                    name="track"
                    label="Preferred Track"
                    value={values.track}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ borderRadius: '12px' }}
                >
                    {TRACKS.map((t, i) => (
                        <MenuItem key={i} value={t}>
                            {t}
                        </MenuItem>
                    ))}
                </Select>
                {touched.track && errors.track && (
                    <Typography sx={{ color: '#d32f2f', fontSize: '0.75rem', mt: '3px', ml: '14px' }}>
                        {errors.track}
                    </Typography>
                )}
            </FormControl>

            <FormControl
                fullWidth
                required
                error={touched.experienceLevel && Boolean(errors.experienceLevel)}
                sx={fieldStyle}
            >
                <InputLabel>Experience Level</InputLabel>
                <Select
                    name="experienceLevel"
                    label="Experience Level"
                    value={values.experienceLevel}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ borderRadius: '12px' }}
                >
                    {EXPERIENCE_LEVELS.map((lvl, i) => (
                        <MenuItem key={i} value={lvl}>
                            {lvl}
                        </MenuItem>
                    ))}
                </Select>
                {touched.experienceLevel && errors.experienceLevel && (
                    <Typography sx={{ color: '#d32f2f', fontSize: '0.75rem', mt: '3px', ml: '14px' }}>
                        {errors.experienceLevel}
                    </Typography>
                )}
            </FormControl>

            <Typography className="rn-reg__form-section-title" sx={{ mt: '16px !important' }}>
                Accounts & Links
            </Typography>

            <TextField
                label="Upwork Profile URL (Optional)"
                name="upworkProfile"
                fullWidth
                placeholder="https://www.upwork.com/freelancers/~your-profile"
                value={values.upworkProfile}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={fieldStyle}
            />

            <TextField
                label="Raenest Username / Email"
                name="raenestAccount"
                required
                fullWidth
                placeholder="Your Raenest account email"
                value={values.raenestAccount}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.raenestAccount && Boolean(errors.raenestAccount)}
                helperText={touched.raenestAccount && errors.raenestAccount}
                sx={fieldStyle}
            />

            <TextField
                label="Portfolio / GitHub Link"
                name="portfolioLink"
                fullWidth
                placeholder="https://github.com/your-username"
                value={values.portfolioLink}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={fieldStyle}
            />


            <LoadingButton
                type="submit"
                loading={isSubmitting}
                className="rn-reg__submit-btn"
                disableElevation
                variant="contained"
            >
                {isSubmitting ? 'Submitting...' : 'Register for Hackathon'}
            </LoadingButton>
        </Box>
    );
};

const SuccessScreen = ({ name, navigate }) => {
    return (
        <Box className="rn-success">
            <Box className="rn-success__glow" />
            <Box className="rn-success__content">
                <Box className="rn-success__icon">
                    🎉
                </Box>
                <Typography className="rn-success__title" component="h1">
                    You're In{name ? `, ${name}` : ''}!
                </Typography>
                <Typography className="rn-success__subtitle">
                    Your registration for the Raenest Hackathon has been received successfully.
                </Typography>

                <Box className="rn-success__info-card">
                    <Box className="rn-success__info-item">
                        <Box className="rn-success__info-icon">📧</Box>
                        <Box>
                            <Typography className="rn-success__info-label">
                                Confirmation Email
                            </Typography>
                            <Typography className="rn-success__info-text">
                                You will receive an email with further details by <strong>March 5th, 2026</strong>. Keep an eye on your inbox!
                            </Typography>
                        </Box>
                    </Box>
                    <Box className="rn-success__divider" />
                    <Box className="rn-success__info-item">
                        <Box className="rn-success__info-icon">🐦</Box>
                        <Box>
                            <Typography className="rn-success__info-label">
                                Stay Updated
                            </Typography>
                            <Typography className="rn-success__info-text">
                                Follow Raenest on Twitter for the latest hackathon updates, announcements, and tips.
                            </Typography>
                            <Button
                                className="rn-success__twitter-btn"
                                href="https://x.com/RaenestApp"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Follow @RaenestApp on X
                            </Button>
                        </Box>
                    </Box>
                </Box>

                <Button
                    className="rn-success__back-btn"
                    onClick={() => navigate('/programs/raenest-hackathon')}
                >
                    ← Back to Hackathon Page
                </Button>
            </Box>
        </Box>
    );
};
