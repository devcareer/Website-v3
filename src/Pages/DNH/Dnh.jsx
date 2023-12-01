import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { DnhBannerImage, bannerImageLines, dpd } from '../../assets/Images';
export const Dnh = ({ heading, text }) => {
  return (
    <Box>
      <Box maxWidth="1041px">
        <BannerTitleImage />
        <Box paddingLeft="40px" paddingRight="40px">
          <Text
            heading="Introduction"
            text="DevCareer, a non-profit organization, recently organized a hackathon centered around themes such as Digital Literacy & Inclusion, Creative Media Technology, Government Services, Subsidy Removal/Mobility, and Financial Inclusion Technology. 
This report highlights the key events, contributions from the DevCareer team, and important feedback received from the event."
          />
          <Text
            heading="Event Overview"
            text="The DevCareer team played a significant role in the successful execution of the hackathon. The following key events took place during the hackathon:"
          />
          <Box marginBottom="32px">
            <Typography
              component="h2"
              variant="body1"
              fontSize={{ xs: '20px', md: '24px' }}
              fontWeight="700"
              color="#181818"
            >
              Pre-Hackathon
            </Typography>
            <Box
              component="ul"
              fontSize={{ xs: '20px', md: '24px' }}
              color="#6D6D6D"
              marginLeft="25px"
            >
              <li>
                DevCareer was engaged as a mentor consultant for the hackathon.
              </li>
              <li>
                DevCareer assisted in selecting the final set of hackers to be
                present in Abuja."
              </li>
            </Box>
          </Box>
          <Box marginBottom="32px">
            <Typography
              component="h2"
              variant="body1"
              fontSize={{ xs: '20px', md: '24px' }}
              fontWeight="700"
              color="#181818"
            >
              Hackathon Day 1
            </Typography>
            <Box
              component="ul"
              fontSize={{ xs: '20px', md: '24px' }}
              color="#6D6D6D"
              marginLeft="25px"
            >
              <li>
                "Provided pitching guidance and ensured alignment with the
                central themes.
              </li>
              <li>Assisted teams in refining their ideas.</li>
              <li>
                Reviewed and provided feedback on pitch decks to improve team
                presentations.
              </li>
              <li>Offered guidance on storytelling and problem definition."</li>
            </Box>
          </Box>
          <Box marginBottom="32px">
            <Typography
              component="h2"
              variant="body1"
              fontSize={{ xs: '20px', md: '24px' }}
              fontWeight="700"
              color="#181818"
            >
              Hackathon Day 2 (Final Day)
            </Typography>
            <Box
              component="ul"
              fontSize={{ xs: '20px', md: '24px' }}
              color="#6D6D6D"
              marginLeft="25px"
            >
              <li>
                "Conducted a demo pitch for all teams to demonstrate effective
                presentation.
              </li>
              <li>
                Corrected mistakes and enhanced storytelling for participating
                teams.
              </li>
              <li>Anchored the demo sessions during final presentations."</li>
            </Box>
          </Box>
          <Box
            position="absolute"
            sx={{ right: '0px', bottom: '-450px', zIndex: '-10' }}
          >
            <img src={dpd} alt="pattern" width={450} />
          </Box>
          <Box>
            <Text heading="Key Feedbacks" />
            <Box marginLeft="35px">
              <Text
                heading="1. Team Formation Process"
                text="Future hackathons should encourage innovators to physically pick their teams at the venue. This change will facilitate the formation of diverse and dynamic teams, enhancing collaboration and creativity."
              />
              <Text
                heading="2. Venue Duration"
                text="It is recommended that hackathons take place at venues open for the entire duration of the event. This continuity ensures teams have uninterrupted access to resources, thereby fostering a more productive and focused environment."
              />

              <Text
                heading="3. Judge Variety"
                text="To ensure a balanced evaluation of hackathon projects, future events should include a more diverse panel of judges, comprising both technical and business experts. This variety will offer a well-rounded assessment of the projects."
              />
              <Text
                heading="4. Collaboration with API Providers"
                text="To further support hackers in leveraging existing technologies for their solutions, it is advisable to foster greater collaboration with API providers. This partnership will encourage the integration of technology and promote more innovative solutions."
              />
            </Box>
            <Text
              heading="Conclusion"
              text="The DevCareer Hackathon 2023 was a success due to the active involvement of the DevCareer team, who provided guidance, support, and mentorship to participating teams. The feedback received will be crucial in enhancing the quality and experience of future hackathons. The valuable lessons learned from this event will undoubtedly contribute to the growth and improvement of subsequent hackathons organized by DevCareer."
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const Text = ({ heading, text }) => {
  return (
    <Box marginBottom="32px">
      <Typography
        component="h2"
        variant="body1"
        fontSize={{ xs: '20px', md: '24px' }}
        fontWeight="700"
        color="#181818"
      >
        {heading}
      </Typography>
      <Typography
        component="h2"
        variant="body1"
        color="#6D6D6D"
        fontSize={{ xs: '20px', md: '24px' }}
        fontWeight="400"
      >
        {text}
      </Typography>
    </Box>
  );
};

const BannerTitleImage = () => {
  return (
    <Stack
      position="relative"
      bgcolor="#E6F9F5"
      sx={{
        backgroundImage: { lg: `url(${bannerImageLines})` },
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '100% 0',
      }}
      py={{ xs: '16px', md: '32px' }}
    >
      <Stack
        width="85%"
        mx="auto"
        direction="row"
        justifyContent="space-between"
      >
        <Box>
          <Typography
            component="h2"
            fontSize={{ xs: '24px', md: '35px', lg: '40px', xl: '55px' }}
            fontWeight="700"
            color="green.800"
          >
            Digital Nigeria Hackathon
          </Typography>
          <Typography
            component="h2"
            fontSize={{ xs: '24px', md: '35px', lg: '40px', xl: '55px' }}
            fontWeight="700"
            color="green.700"
          >
            Post-Hackathon Report
          </Typography>
        </Box>
        <Box
          display={{ xs: 'none', lg: 'block' }}
          component="img"
          src={DnhBannerImage}
          alt="tbd logo"
          sx={{
            height: '147px',
            width: '296px',
          }}
        />
      </Stack>
    </Stack>
  );
};

export default Dnh;
