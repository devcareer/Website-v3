import { Box, Stack, Typography } from '@mui/material';
import copy from 'copy-to-clipboard';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createProfile, getProfile } from '../../../../API/api';
import { link } from '../../../assets/Images';
import { Input, TagInput } from '../../../components';
import { profileActions } from '../../../store';
import { getUserName } from '../../../utils';
import Education from './Education';
import WorkExperience, { ActionButtons, AddButton } from './WorkExperience';
const EditProfile = () => {
  const username = getUserName();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.personal);
  useEffect(() => {
    console.log('How many times did you render?');
    const getProfileData = async () => {
      try {
        const res = await getProfile();
        const profileData = res.data.profile?.[0];
        dispatch(profileActions.writeExistingProfile(profileData));
      } catch (err) {
        console.log(err);
      }
    };
    getProfileData();
  }, [dispatch]);
  const [generatedLink, setGeneratedLink] = useState('');
  const handleGenerateLink = () => {
    setGeneratedLink(`devcareers.io/${username}`);
  };
  const handleCopy = () => {
    copy(generatedLink);
    toast.success('Linked copied!', {
      position: 'bottom-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };
  const profileData = useSelector((state) => state);
  const submitProfile = async () => {
    try {
      const res = await createProfile(profileData);
      console.log(res);
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message || err.response.data.error);
    }
  };
  return (
    <Box width="90%" py="48px" sx={{ maxWidth: '1018px', mx: 'auto' }}>
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
          value={state. jobTitle}
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
          title="Portfolio Link"
          placeholder="https://adevikthur.xyz"
          onChange={(e) => {
            dispatch(profileActions.addPortfolioUrl(e.target.value));
          }}
          value={state.portfolioURL}
        />
        <TagInput />
      </Stack>
      <>
        <WorkExperience />
        <Education />
        <ActionButtons text="Apply Changes" handleSubmit={submitProfile} />
        {generatedLink ? (
          <div>
            <Input value={generatedLink} />
            <AddButton title="Copy Link" src={link} openModal={handleCopy} />
          </div>
        ) : (
          <AddButton
            title="Generate Preview Link"
            src={link}
            openModal={handleGenerateLink}
          />
        )}
      </>
    </Box>
  );
};

export default EditProfile;
