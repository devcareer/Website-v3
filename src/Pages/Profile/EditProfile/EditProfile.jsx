import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createProfile, getProfile } from '../../../../API/api';
import { Input, TagInput } from '../../../components';
import { profileActions } from '../../../store';
import Education from './Education';
import WorkExperience, { ActionButtons } from './WorkExperience';
import { useNavigate } from 'react-router-dom';
const EditProfile = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const state = useSelector((state) => state.personal);
  const profileData = useSelector((state) => state);
  const [isActive, setIsActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialRender = useRef(true);
  useEffect(() => {
    console.log('How many times did you render?');
    const getProfileData = async () => {
      try {
        const res = await getProfile();
        if (res.status === 200) {
          const profileData = res.data.profile?.[0];
          dispatch(profileActions.writeExistingProfile(profileData));
        }
      } catch (err) {
        toast.error('Oops, Token expired! Please try signing in again ');
        navigate('/auth/?mode=signin')
        console.log(err);
      }
    };
    getProfileData();
  }, [dispatch]);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    setIsActive(true);
  }, [profileData]);

  const submitProfile = async () => {
    setIsSubmitting(true);
    try {
      console.log(profileData)
      const res = await createProfile(profileData);
      toast.success('Profile Updated Successfully');
      setIsSubmitting(false);
      
    } catch (err) {
      toast.error(err.response.data.message || err.response.data.error);
      setIsSubmitting(false);
    }
  };
  return (
    <Box
      width="90%"
      bgcolor="#fefefe"
      sx={{ maxWidth: '1018px', mx: 'auto' }}
      mt="58px"
      borderRadius="8px"
    >
      <Box width="90%" mx="auto" py="48px">
        <Typography variant="body1" color="#888888" fontSize="24px">
          Edit Profile
        </Typography>
        <Typography
          variant="body1"
          color="#212121"
          mt="40px"
          mb="16px"
          fontSize="24px"
        >
          Basic Information
        </Typography>
        <Stack gap="16px">
          <Input
            title="Full Name"
            placeholder="Adekanbi Julius Asaolu"
            onChange={(e) => {
              dispatch(profileActions.addFullName(e.target.value));
            }}
            value={state.fullName}
          />
          <Input
            title="About"
            placeholder="With over 3 years of experience in brand identity, illustration, and Product Design, I specialize in creating aesthetically pleasing and usable products for various industries. My focus is on transforming complex technology into straightforward, user-friendly solutions."
            onChange={(e) => {
              dispatch(profileActions.addAbout(e.target.value));
            }}
            value={state.about}
          />
          <Input
            title="Job Title"
            placeholder="Product Designer"
            onChange={(e) => {
              dispatch(profileActions.addJobTitle(e.target.value));
            }}
            value={state.jobTitle}
          />
          <Input
            title="Location"
            placeholder="Washington DC, United States. "
            onChange={(e) => {
              dispatch(profileActions.addLocation(e.target.value));
            }}
            value={state.location}
          />
          <Input
            title="Portfolio Link(Github,Behance,Dribble...)"
            placeholder="https://adevikthur.xyz"
            onChange={(e) => {
              dispatch(profileActions.addPortfolioUrl(e.target.value));
            }}
            value={state.portfolioURL}
          />
          <Input
            title="Linkedin Url"
            placeholder="https://www.linkedin.com/in/adevikthur.xyz/"
            onChange={(e) => {
              dispatch(profileActions.addLinkedinUrl(e.target.value));
            }}
            value={state.linkedinUrl}
          />
          <TagInput />
        </Stack>
        <>
          <WorkExperience />
          <Education />
          <ActionButtons
            text="Apply Changes"
            handleSubmit={submitProfile}
            isActive={isActive}
            isSubmitting={isSubmitting}
          />
        </>
      </Box>
    </Box>
  );
};

export default EditProfile;
