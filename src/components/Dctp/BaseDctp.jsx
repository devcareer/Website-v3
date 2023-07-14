import { Box, Button, Stack, Typography } from '@mui/material';
import { bmagic, cpu, dpd, product, timer } from '../../assets/Images';
import TitleBanner from '../Banner/TitleBanner';
import DpdsFooter from './DctpFooter';
import { useNavigate } from 'react-router-dom';
const BaseDctp = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <TitleBanner title=" DevCareer Tech Program" flag={true} />
      <Box position="relative">
        <Box
          sx={{
            width: { xs: '90%', lg: '85%' },
            maxWidth: { xl: '1200px' },
            mx: 'auto',
          }}
        >
          <Typography
            variant="body1"
            color="initial"
            textAlign={{ xs: 'center', lg: 'left' }}
            mt={2}
            sx={{
              fontSize: { xs: '16px', lg: '18px' },
              fontWeight: { xs: '500', lg: '700' },
              color: '#C2C2C2',
            }}
          >
            ABOUT THIS PROGRAM
          </Typography>

          <Typography
            variant="body1"
            color="initial"
            sx={{
              fontSize: { xs: '16px', lg: '20px' },
              color: '#6D6D6D',
              mt: '15px',
              maxWidth: '1041px',
            }}
          >
            DevCareer, a non-profit organization, partners with{' '}
            <Typography
              variant="body1"
              component="span"
              color="initial"
              sx={{
                fontWeight: '600',
                fontSize: { xs: '16px', lg: '20px' },
                color: '#363636',
              }}
            >
              UK-Nigeria Tech Hub{' '}
            </Typography>
            to upskill 1700 technology enthusiasts through The{' '}
            <Typography
              variant="body1"
              color="initial"
              component="span"
              sx={{
                fontWeight: '600',
                color: '#363636',
                fontSize: { xs: '16px', lg: '20px' },
              }}
            >
              DevCareer tech program
            </Typography>{' '}
            . Our goal at DevCareer is to support underrepresented tech talents
            entering the industry by providing resources, scholarships in
            collaboration with learning platforms, fostering an inclusive
            community, and exploring innovative approaches.
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            sx={{
              fontSize: { xs: '16px', lg: '20px' },
              color: '#6D6D6D',
              mt: '30px',
              maxWidth: '1041px',
            }}
          >
            The DevCareer tech program is a{' '}
            <Typography
              variant="body1"
              color="initial"
              component="span"
              sx={{
                fontWeight: '600',
                color: '#363636',
                fontSize: { xs: '16px', lg: '20px' },
              }}
            >
              6-month program
            </Typography>{' '}
            in Nigeria, catering to individuals seeking growth in their software
            development careers. Participants will receive training in{' '}
            <Typography
              component="span"
              variant="body1"
              color="initial"
              sx={{
                fontWeight: '600',
                fontSize: { xs: '16px', lg: '20px' },
                color: '#363636',
              }}
            >
              Software Development, Product Management, and Product Design
            </Typography>{' '}
            . Mentors will provide guidance and support throughout the program.
            Stay tuned for application submissions from interested participants
            and mentors.
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            sx={{
              fontSize: { xs: '16px', lg: '20px' },
              color: '#6D6D6D',
              mt: '40px',
              maxWidth: '1041px',
            }}
          >
            This comprehensive program offers virtual live classes, peer
            learning sessions, training workshops, and visual learning content
            through a
            <Typography
              component="span"
              variant="body1"
              color="initial"
              sx={{
                fontWeight: '600',
                fontSize: { xs: '16px', lg: '20px' },
                color: '#363636',
              }}
            >
              {' '}
              Learning Management System
            </Typography>{' '}
            . It emphasizes both curricular and extracurricular activities,
            including hands-on project-based learning and regular assessments to
            measure participants' progress.
          </Typography>
          <Typography
            variant="body1"
            color="initial"
            sx={{
              fontSize: { xs: '16px', lg: '20px' },
              color: '#6D6D6D',
              mt: '40px',
              maxWidth: '1041px',
            }}
          >
            The DevCareer tech program welcomes young people from all
            communities in Nigeria, regardless of gender or educational
            background.
          </Typography>
        </Box>
        <Box
          position="absolute"
          sx={{ right: '0px', bottom: '-220px', zIndex: '-10' }}
        >
          <img src={dpd} alt="pattern" width={450} />
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: '90%', lg: '85%' },
          maxWidth: { xl: '1200px' },
          mx: 'auto',
          mt: '56px',
        }}
      >
        <Typography
          variant="body1"
          color="initial"
          textAlign={{ xs: 'center', lg: 'left' }}
          sx={{
            color: '#C2C2C2',
            fontSize: { xs: '16px', lg: '20px' },
            fontWeight: '700',
            mb: '16px',
          }}
        >
          PROGRAM DURATION
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent={{ xs: 'center', lg: 'flex-start' }}
          gap={2}
        >
          <Box mt={1}>
            <img src={timer} alt="time" />
          </Box>
          <Typography
            variant="body1"
            color="initial"
            sx={{ color: '#6D6D6D', fontSize: { xs: '16px', lg: '20px' } }}
          >
            6 Months
          </Typography>
        </Stack>
        <Box sx={{ mt: '56px' }}>
          <Typography
            variant="body1"
            color="initial"
            textAlign="center"
            mb={2}
            sx={{
              color: '#C2C2C2',
              fontSize: { xs: '16px', lg: '20px' },
              fontWeight: '700',
            }}
          >
            AVAILABLE SKILLS
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="center"
            sx={{ gap: { xs: '20px', md: '12px', lg: '32px' } }}
          >
            <Stack
              alignItems="center"
              sx={{ flexBasis: { xs: '100%', lg: '386px' } }}
            >
              <Box>
                <img src={cpu} alt="cpu" />
              </Box>
              <Typography
                variant="body1"
                color="initial"
                textAlign="center"
                sx={{
                  lineHeight: '40px',

                  fontSize: { xs: '17.5px', lg: '30px' },
                  fontWeight: '500',
                  maxWidth: '200px',
                  color: '#6D6D6D',
                }}
              >
                Software Development
              </Typography>
            </Stack>
            <Stack
              alignItems="center"
              sx={{ flexBasis: { xs: '100%', lg: '386px' } }}
            >
              <Box>
                <img src={product} alt="cpu" />
              </Box>
              <Typography
                variant="body1"
                textAlign="center"
                color="initial"
                sx={{
                  lineHeight: '40px',
                  fontSize: { xs: '17.5px', lg: '30px' },
                  fontWeight: '500',
                  maxWidth: '200px',
                  color: '#6D6D6D',
                }}
              >
                Product Management
              </Typography>
            </Stack>
            <Stack
              alignItems="center"
              sx={{ flexBasis: { xs: '100%', lg: '386px' } }}
            >
              <Box>
                <img src={bmagic} alt="cpu" />
              </Box>
              <Typography
                variant="body1"
                textAlign="center"
                color="initial"
                sx={{
                  lineHeight: '40px',
                  fontSize: { xs: '17.5px', lg: '30px' },
                  fontWeight: '500',
                  maxWidth: '200px',
                  color: '#6D6D6D',
                }}
              >
                Product Design
              </Typography>
            </Stack>
          </Stack>
          <Stack alignItems="center" marginY="4rem">
            <Button
              disabled
              onClick={() => navigate('/programs/dpds/registration')}
              variant="contained"
              disableElevation
              sx={{
                borderRadius: '8px',
                maxWidth: '600px',
                color: 'white',
                width: '100%',
                paddingBlock: { xs: '15px', lg: '20px' },
                fontSize: { xs: '16px', lg: '18px' },
              }}
            >
              Enroll into Program
            </Button>
          </Stack>
        </Box>
      </Box>
      <DpdsFooter />
    </Box>
  );
};

export default BaseDctp;
