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

const Overview = () => {
  const username = getUserName();
  const [generatedLink, setGeneratedLink] = useState('');
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
      <Box>
        <Title>Adekanbi Julius Asaolu</Title>
        <Typography
          component="h2"
          variant="subtitle1"
          color="text.grey.300"
          fontWeight={500}
          fontSize="16px"
        >
          Product Designer
        </Typography>
        <Typography
          component="h3"
          variant="subtitle2"
          color="text.grey.700"
          fontWeight={400}
          fontSize="16px"
        >
          adevikthur.xyz
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
          With over 3 years of experience in brand identity, illustration, and
          Product Design, I specialize in creating aesthetically pleasing and
          usable products for various industries. My focus is on transforming
          complex technology into straightforward, user-friendly solutions.
        </Typography>
      </Box>
      <Box mt="28px">
        <Title>Skills</Title>
        <Box display="flex" columnGap="20px" mt="12px">
          <Skill skill="CSS" />
          <Skill skill="HTML" />
          <Skill skill="JavaScript" />
          <Skill skill="VueJs" />
          <Skill skill="Figma" />
        </Box>
      </Box>
      <Box mt="28px">
        <Title>Work Experience</Title>
        <Box mt="12px">
          <Box
            display="grid"
            gridTemplateColumns="175px 1fr"
            mb="8px"
            columnGap="20px"
          >
            <Typography fontSize="16px" fontWeight={400} color="text.grey.700">
              <span>Jan 2023</span> - <span>Apr 2023</span>
            </Typography>
            <Box>
              <Typography
                fontWeight="500"
                color="text.grey.300"
                fontSize="16px"
              >
                Frontend Developer
              </Typography>
              <Typography
                fontSize="16px"
                fontWeight={400}
                color="text.grey.700"
              >
                <span>MoneyAfrica</span> • <span>Full-Time</span>
              </Typography>
            </Box>
          </Box>
          <Box
            display="grid"
            gridTemplateColumns="175px 1fr"
            mb="8px"
            columnGap="20px"
          >
            <Typography fontSize="16px" fontWeight={400} color="text.grey.700">
              <span>Sept 2023</span> - <span>Sept 2023</span>
            </Typography>
            <Box>
              <Typography
                fontWeight="500"
                color="text.grey.300"
                fontSize="16px"
              >
                Frontend Development Intern
              </Typography>
              <Typography
                fontSize="16px"
                fontWeight={400}
                color="text.grey.700"
              >
                <span>ZubiPay</span> • <span>Internship</span>
              </Typography>
            </Box>
          </Box>
          <Box
            display="grid"
            gridTemplateColumns="175px 1fr"
            mb="8px"
            columnGap="20px"
          >
            <Typography fontSize="16px" fontWeight={400} color="text.grey.700">
              <span>Sept 2023</span> - <span>Sept 2023</span>
            </Typography>
            <Box>
              <Typography
                fontWeight="500"
                color="text.grey.300"
                fontSize="16px"
              >
                Frontend Development Intern
              </Typography>
              <Typography
                fontSize="16px"
                fontWeight={400}
                color="text.grey.700"
              >
                <span>MoneyAfrica</span> • <span>Internship</span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box mt="28px" mb="48px">
        <Title>Education</Title>
        <Box mt="12px">
          <Box
            display="grid"
            gridTemplateColumns="175px 1fr"
            mb="8px"
            columnGap="20px"
          >
            <Typography fontSize="16px" fontWeight={400} color="text.grey.700">
              <span>Jan 2023</span> - <span>Apr 2023</span>
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
                <span className="degree">Bachelor’s</span> •{' '}
                <span>Interaction Design</span>
              </Typography>
              <Typography
                fontSize="16px"
                fontWeight={400}
                color="text.grey.700"
              >
                <span>Harvard University</span>
              </Typography>
            </Box>
          </Box>
          <Box
            display="grid"
            gridTemplateColumns="175px 1fr"
            mb="8px"
            columnGap="20px"
          >
            <Typography fontSize="16px" fontWeight={400} color="text.grey.700">
              <span>Jan 2023</span> -<span>Apr 2023</span>
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
                <span className="degree">Master’s</span> •
                <span> User Heuristics</span>
              </Typography>
              <Typography
                fontSize="16px"
                fontWeight={400}
                color="text.grey.700"
              >
                <span>Oklahoma State University</span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
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
