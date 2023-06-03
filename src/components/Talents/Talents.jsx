import {
  Box,
  Grid,
  Typography,
  Stack,
  Button,
  Paper,
  IconButton,
  InputBase,
} from '@mui/material';
import { talents } from '../../talents';
import TalentCard from './TalentCard';
import { search } from '../../assets/Images';
import { useState } from 'react';
const Track = [
  {
    id: 1,
    title: 'All',
  },
  {
    id: 2,
    title: 'Design',
  },
  {
    id: 3,
    title: 'Frontend Eng.',
  },
  {
    id: 4,
    title: 'Backend Eng.',
  },
  {
    id: 5,
    title: 'Fullstack Eng.',
  },
];
const Talents = () => {
  const [isBlue, setIsBlue] = useState(1);
  const handleClick = (id) => {
    setIsBlue(id);
  };
  return (
    <Box
      pt={3}
      pb={10}
      sx={{
        maxWidth: '1200px',
        mx: 'auto',
        paddingInline: { xs: '24px', lg: '0' },
      }}
    >
      <Box
        sx={{
          background: 'linear-gradient(to left top,  #00B964,#1E6091)',
          padding: '48px',
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
          }}
        >
          Browse through our curated collection of profiles and get inspired by
          the diverse range of skills and expertise showcased by our community
          members.
        </Typography>
      </Box>
      <Box sx={{ paddingTop: '40px', paddingBottom: '15px' }}>
        <Paper
          elevation={0}
          sx={{
            border: '1px solid #E0E0E0',
            borderRadius: '8px',
            maxWidth: '500px',
            padding: '16px',
          }}
        >
          <IconButton
            type="button"
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              p: '10px',
              height: '24px',
              mt: '-4px',
            }}
            aria-label="search"
          >
            <img src={search} alt="" />
          </IconButton>
          <InputBase
            sx={{ ml: 0.3, flex: 1, fontSize: '20px' }}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
        </Paper>
      </Box>
      <Box>
        <Stack direction="row" sx={{ flexWrap: { xs: 'wrap' } }} py={3} gap={2}>
          {Track.map((item) => {
            return (
              <Button
                onClick={() => handleClick(item.id)}
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
        {talents.map((item) => {
          return (
            <Grid item sx={4} xs={12} sm={6} lg={4} key={item.id}>
              <TalentCard data={item} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Talents;
