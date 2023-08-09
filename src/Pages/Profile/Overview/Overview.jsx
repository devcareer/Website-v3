import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify';
import { link } from '../../../assets/Images';
import { Input } from '../../../components';
import { getUserName } from '../../../utils';
import { AddButton } from '../EditProfile/WorkExperience';
import { Skill } from './components/Skill';
import { Title } from './components/Title';
import dayjs from 'dayjs';
import { getProfile } from '../../../../API/api';
import LinearProgress from '@mui/material/LinearProgress';

const Overview = () => {
  const [profileData, setProfileData] = useState({});
  const [showNoProfile, setShowNoProfile] = useState(false);
  const [generatedLink, setGeneratedLink] = useState(localStorage.getItem('link'));
  const [loading,setLoading]=useState(false)
  const username = getUserName();

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const res = await getProfile();
        const profileData = res.data.profile?.[0];
        if (profileData) {
          setProfileData(profileData);
          setShowNoProfile(false);
          setLoading(false)
        } else {
          setShowNoProfile(true);
        }
      } catch (err) {
        setLoading(false)
        console.log(err);
        toast.error('FAILED TO FETCH PROFILE DATA');
      }
    })();
  }, []);

  const handleGenerateLink = () => {
    localStorage.setItem(`link`,`https://cute-sable-24dd43.netlify.app/profile/${username}`)
    setGeneratedLink(
      `https://cute-sable-24dd43.netlify.app/profile/${username}`
    );
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
    loading?<LinearProgress  sx={{display:'flex',justifyContent:'center',alignItems:'center'}}/>:
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
              {profileData.experiences.map((experience) => {
                return (
                  <Box
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
              {profileData.educations.map((education) => {
                return (
                  <Box
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
          <Typography>You have not created a profile.</Typography>
        </Box>
      )}

      {/* {!showNoProfile && generatedLink ? (
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
          isActive={!showNoProfile}
        />
      )} */}
      {
       (!showNoProfile && generatedLink) &&( <>
       <Input value={generatedLink} />
       <AddButton
          title="Copy Link"
          src={link}
          openModal={handleCopy}
          color="#05B993"
        /></>)
      }
      {
       (!showNoProfile && !generatedLink) && <AddButton
        title="Generate Preview Link"
        src={link}
        openModal={handleGenerateLink}
        color="#05B993"
        isActive={!showNoProfile}
      />
      }
    </Box>
  );
};

export default Overview;
