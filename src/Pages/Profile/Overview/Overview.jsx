import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import copy from 'copy-to-clipboard';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { link } from '../../../assets/Images';
import { Input } from '../../../components';
import { getUserName } from '../../../utils';
import { AddButton } from '../EditProfile/WorkExperience';
import { Skill } from './components/Skill';
import { Title } from './components/Title';
import { Skill } from './components/Skill';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { getProfile } from '../../../../API/api';
import { useSelector } from 'react-redux';

const Overview = () => {
  const [profileData, setProfileData] = useState(null);
  const [generatedLink, setGeneratedLink] = useState('');

  const username = getUserName();

  useEffect(() => {
    (async () => {
      try {
        const res = await getProfile();
        const profileData = res.data.profile?.[0];
        setProfileData(profileData);
      } catch (err) {
        toast.error('FAILED TO FETCH PROFILE DATA');
      }
    })();
  }, []);

  const handleGenerateLink = () => {
    setGeneratedLink(`https://devcareers.io/${username}`);
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
  return (
    <Box
      width="90%"
      py="48px"
      px="120px"
      maxWidth="1018px"
      mx="auto"
      backgroundColor="#FEFEFE"
      mt="48px"
    >
      {profileData ? (
        <>
          <Box>
            <Title>{profileData.personal.fullName}</Title>
            <Typography
              component="h2"
              variant="subtitle1"
              color="text.grey.300"
              fontWeight={500}
              fontSize="16px"
            >
              {profileData.personal.jobTitle}
            </Typography>
            <Typography
              component="h3"
              variant="subtitle2"
              color="text.grey.700"
              fontWeight={400}
              fontSize="16px"
            >
              {profileData.personal.location}
            </Typography>
          </Box>
          <Box mt="28px">
            <Title>About</Title>
            <Typography
              component="h2"
              variant="body2"
              color="text.grey.300"
              fontWeight={400}
              fontSize="16px"
              mt="12px"
            >
              {profileData.personal.about}
            </Typography>
          </Box>
          <Box mt="28px">
            <Title>Skills</Title>
            <Box display="flex" columnGap="20px" mt="12px">
              {profileData.skills.map((skill) => {
                return <Skill skill={skill} key={skill} />;
              })}
            </Box>
          </Box>
          <Box mt="28px">
            <Title>Work Experience</Title>
            <Box mt="12px">
              {profileData.experiences.map((experience) => {
                return (
                  <Box
                    display="grid"
                    gridTemplateColumns="175px 1fr"
                    mb="8px"
                    columnGap="20px"
                  >
                    <Typography
                      fontSize="16px"
                      fontWeight={400}
                      color="text.grey.700"
                    >
                      <span>
                        {dayjs(experience.startDate).format('MMM YYYY')}
                      </span>{' '}
                      -{' '}
                      <span>
                        {dayjs(experience.endDate).format('MMM YYYY')}
                      </span>
                    </Typography>
                    <Box>
                      <Typography
                        fontWeight="500"
                        color="text.grey.300"
                        fontSize="16px"
                      >
                        {experience.jobTitle}
                      </Typography>
                      <Typography
                        fontSize="16px"
                        fontWeight={400}
                        color="text.grey.700"
                      >
                        <span>{experience.companyName}</span> •{' '}
                        <span>{experience.employmentType}</span>
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box mt="28px">
            <Title>Education</Title>
            <Box mt="12px">
              {profileData.educations.map((education) => {
                return (
                  <Box
                    display="grid"
                    gridTemplateColumns="175px 1fr"
                    mb="8px"
                    columnGap="20px"
                  >
                    <Typography
                      fontSize="16px"
                      fontWeight={400}
                      color="text.grey.700"
                    >
                      <span>{education.startYear}</span>
                      <span> - {education.endYear}</span>
                    </Typography>
                    <Box>
                      <Typography
                        color="text.grey.800"
                        fontWeight={500}
                        fontSize="16px"
                        sx={{
                          '& .degree': {
                            fontWeight: '500',
                            fontSize: '16px',
                            color: 'text.grey.700',
                          },
                        }}
                      >
                        <span className="degree">{education.degree}</span>
                        <span> • {education.course}</span>
                      </Typography>
                      <Typography
                        fontSize="16px"
                        fontWeight={400}
                        color="text.grey.700"
                      >
                        <span>{education.schoolName}</span>
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </>
      ) : (
        <Box>
          <Typography>You have not created a profile.</Typography>
        </Box>
      )}
      {generatedLink ? (
        <Box>
          <Input value={generatedLink} />
          <AddButton
            title="Copy Link"
            src={link}
            openModal={handleCopy}
            color="#05B993"
          />
        </Box>
      ) : (
        <AddButton
          title="Generate Preview Link"
          src={link}
          openModal={handleGenerateLink}
          color="#05B993"
        />
      )}
    </Box>
  );
};

export default Overview;
