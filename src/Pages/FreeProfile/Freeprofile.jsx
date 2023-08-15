import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { Skill } from './components/Skill';
import { Title } from './components/Title';
import dayjs from 'dayjs';
import { Link, useParams } from 'react-router-dom';
import { getFreeProfile } from '../../../API/api';

const FreeProfile = () => {
  const [profileData, setProfileData] = useState();
  const [showNoProfile, setShowNoProfile] = useState(false);
  const userName = useParams().id;
  useEffect(() => {
    (async () => {
      try {
        const res = await getFreeProfile(userName);
        const profileData = res.data.profile;
        console.log(profileData);
        if (profileData) {
          setProfileData(profileData);
          setShowNoProfile(false);
        } else {
          setShowNoProfile(true);
        }
      } catch (error) {
        setShowNoProfile(true);
        toast.error(error.response.data.message);
      }
    })();
  }, [userName]);

  return (
    <Box
      width="90%"
      py={{ lg: '48px', md: '30px', xs: '20px' }}
      px={{ lg: '120px', md: '60px', xs: '40px' }}
      maxWidth="1018px"
      mx="auto"
      backgroundColor="#FEFEFE"
      mt="48px"
    >
      {profileData && Object.keys(profileData).length ? (
        <>
          <Box display="flex" flexDirection={{ xs: 'column' }}>
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
            <Typography color="#6D6D6D">
              {profileData.personal.portfolioURL}
            </Typography>
            <Typography color="#6D6D6D">
              {profileData.personal.linkedinUrl}
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
          <Box mt="28px" display="flex" flexDirection={{ xs: 'column' }}>
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
            <Box
              display="flex"
              columnGap="20px"
              mt="12px"
              rowGap={{ xs: '20px' }}
              flexWrap={{ xs: 'wrap' }}
            >
              {profileData.skills.map((skill) => {
                return <Skill skill={skill} key={skill} />;
              })}
            </Box>
          </Box>
          <Box mt="28px">
            <Title>Work Experience</Title>
            <Box mt="12px">
              {profileData.experiences.map((experience, index) => {
                return (
                  <Box
                    key={index}
                    display={{ md: 'grid', xs: 'flex' }}
                    flexDirection={{ xs: 'column' }}
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
                        {experience.tillPresent
                          ? 'Present'
                          : dayjs(experience.endDate).format('MMM YYYY')}
                      </span>
                    </Typography>
                    <Box mb={{ xs: '10px' }}>
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
              {profileData.educations.map((education, index) => {
                return (
                  <Box
                    key={index}
                    display={{ md: 'grid', xs: 'flex' }}
                    flexDirection={{ xs: 'column' }}
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
                        {dayjs(education.startYear).format('MMM YYYY')}
                      </span>
                      <span>
                        {' '}
                        - {dayjs(education.endYear).format('MMM YYYY')}
                      </span>
                    </Typography>
                    <Box mb={{ xs: '10px' }}>
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
      ) : null}
      {showNoProfile && (
        <Box>
          <Typography sx={{ fontWeight: '500', fontSize: '20px' }}>
            This profile hasn't been created. Create an{' '}
            <Link to="https://devcareer.io/auth/?mode=signup">account</Link> to
            get one.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default FreeProfile;
