import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Input } from '../../components';
import { ActionButtons } from '../../Pages/Profile/EditProfile/WorkExperience';
const AddExperienceModal = ({ closeModal }) => {
  return (
    <Box>
      <Box
        onClick={closeModal}
        className="overlay"
        bgcolor="rgba(0,0,0,0.5)"
        position="fixed"
        top="0"
        left="0"
        width="100vw"
        height="100vh"
        zIndex="2"
      ></Box>
      <Stack
        bgcolor="#fff"
        borderRadius="8px"
        width="90%"
        maxWidth="1000px"
        px={{ xs: '30px', lg: '136px' }}
        py={{ xs: '20px', md: '48px' }}
        position="fixed"
        top={{ xs: '5%', md: '10%' }}
        zIndex="4"
        height="80vh"
        sx={{
          overflowY: 'scroll',
        }}
      >
        <Typography
          fontWeight="500"
          fontSize="24px"
          color="text.grey.600"
          mb="40px"
        >
          Add Work Experience
        </Typography>
        <Typography
          fontWeight="700"
          fontSize="24px"
          color="text.grey.300"
          mb="16px"
        >
          Work Information
        </Typography>
        <Stack component="form" gap="16px">
          <Input title="Company Name" placeholder="e.g Amazon" />
          <Input title="Job Title" placeholder="e.g Frontend Engineer" />
          <Input title="Type of Employment" placeholder="e.g Psychology" />
          <Stack direction={{ xs: 'column', md: 'row' }} gap="8px">
            <Input
              title="Start Date"
              type="date"
              width={{ xs: '100%', md: '50%' }}
            />
            <Input
              title="End Date"
              type="date"
              width={{ xs: '100%', md: '50%' }}
            />
          </Stack>
        </Stack>
        <ActionButtons text="Save Changes" closeModal={closeModal} />
      </Stack>
    </Box>
  );
};

export default AddExperienceModal;
