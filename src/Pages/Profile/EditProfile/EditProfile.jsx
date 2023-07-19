import { Input,TagInput } from '../../../components';
import { Typography, Box, Stack } from '@mui/material';
import WorkExperience, { ActionButtons, AddButton } from './WorkExperience';
import Education from './Education';
import { link } from '../../../assets/Images';
const EditProfile = () => {
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
        <Input title="Full Name" placeholder="Adekanbi Julius Asaolu" />
        <Input
          title="About"
          placeholder="With over 3 years of experience in brand identity, illustration, and Product Design, I specialize in creating aesthetically pleasing and usable products for various industries. My focus is on transforming complex technology into straightforward, user-friendly solutions."
        />
        <Input title="Job Title" placeholder="Product Designer" />
        <Input title="Location" placeholder="Washington DC, United States. " />
        <Input title="Portfolio Link" placeholder="https://adevikthur.xyz" />
        <TagInput  />
      </Stack>
      <>
        <WorkExperience />
        <Education />
        <ActionButtons text="Apply Changes" />
        <AddButton title="Generate Preview Link" src={link} />
      </>
    </Box>
  );
};

export default EditProfile;
