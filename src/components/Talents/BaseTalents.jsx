import {
  Box,
  Button,
  Grid,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
// import { talents } from '../../talents';
import { useState } from 'react';
import { talents } from '../../L4dtalent';
import { TalentCard } from '../index';
const Track = [
  {
    id: 1,
    title: 'All',
    subtitle: 'all',
  },
  {
    id: 2,
    title: 'Design',
    subtitle: 'Product Design',
  },
  {
    id: 3,
    title: 'Frontend Eng.',
    subtitle: 'Frontend Engineering',
  },
  {
    id: 4,
    title: 'Backend Eng.',
    subtitle: 'Backend Engineering',
  },
  {
    id: 5,
    title: 'Fullstack Eng.',
    subtitle: 'Full Stack Engineering',
  },
];
const BaseTalents = () => {
  const [talent, setTalent] = useState(talents);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(9);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // Records to be displayed on the current page
  const currentRecords = talent.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(talents.length / recordsPerPage);

  const [isBlue, setIsBlue] = useState(1);
  const handleClick = (id, subtitle) => {
    setIsBlue(id);
    console.log(subtitle);
    if (subtitle === 'all') {
      setTalent(talents);
    } else {
      const latestTalent = talents.filter((item) => item.skill === subtitle);
      setTalent(latestTalent);
    }
  };
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <Box
      pt={3}
      pb={10}
      sx={{
        width: { xs: '90%', lg: '85%' },
        maxWidth: { xl: '1200px' },
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          background: 'linear-gradient(to left top,  #00B964,#1E6091)',
          padding: { xs: '20px', lg: '48px' },
          borderRadius: '8px',
        }}
      >
        <Typography
          variant="body1"
          color="initial"
          sx={{
            fontSize: { xs: '32px', lg: '64px' },
            fontWeight: '700',
            color: '#FEFEFE',
            textAlign: { xs: 'center', sm: 'left', lg: 'left' },
          }}
        >
          Discover Outstanding Talents
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '15px', lg: '20px' },
            color: '#FEFEFE',
            maxWidth: '744px',
            textAlign: { xs: 'center', sm: 'left', lg: 'left' },
          }}
        >
          Browse through our curated collection of profiles and get inspired by
          the diverse range of skills and expertise showcased by our community
          members.
        </Typography>
      </Box>

      <Box>
        <Stack direction="row" sx={{ flexWrap: { xs: 'wrap' } }} py={3} gap={2}>
          {Track.map((item) => {
            return (
              <Button
                onClick={() => handleClick(item.id, item.subtitle)}
                variant="outlined"
                key={item.id}
                sx={{
                  backgroundColor: `${isBlue === item.id ? '#1E6091' : '#fff'}`,
                  borderRadius: '80px',
                  p: '1rem',
                  color: `${isBlue === item.id ? '#fff' : '#1E6091'}`,
                  border: '1px solid #1E6091',
                  ':hover': {
                    border: '1px solid #1E6091',
                    backgroundColor: `${isBlue === item.id ? '#1e6091' : ''}`,
                    color: `${isBlue === item.id ? '#fff' : '#1e6091'}`,
                  },
                }}
              >
                {item.title}
              </Button>
            );
          })}
        </Stack>
      </Box>

      <Grid container direction="row" spacing={1.8}>
        {currentRecords.map((item) => {
          return (
            <Grid item sx={4} xs={12} sm={6} lg={4} key={item.id}>
              <TalentCard data={item} />
            </Grid>
          );
        })}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '4rem' }}>
        <Pagination
          page={currentPage}
          count={nPages}
          onChange={handleChange}
          size="large"
        />
      </Box>
    </Box>
  );
};

export default BaseTalents;
