import { Box, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
const CommunityCard = () => {
  const menuStyle = {
    color: '#888888',
    textDecoration: 'none',
  };
  return (
    <Stack
      gap={2}
      sx={{
        p: '0.4rem',
        borderRadius: '8px',
        backgroundColor: '#fff',
        maxWidth: '288px',
        width: '100%',
        border: '1px solid #E8E8E8',
      }}
    >
      <Link to="community/talents" style={menuStyle}>
        <Box
          sx={{
            borderRadius: '8px',
            p: '0.7rem',
            ':hover': {
              backgroundColor: '#E8E8E8',
            },
          }}
        >
          Talents
        </Box>
      </Link>
      <Link to="community/slack" style={menuStyle}>
        <Box
          sx={{
            borderRadius: '8px',
            p: '0.7rem',
            ':hover': {
              backgroundColor: '#E8E8E8',
            },
          }}
        >
          {' '}
          Slack Channel
        </Box>
      </Link>
      <Link style={menuStyle}>
        <Box
          sx={{
            borderRadius: '8px',
            p: '0.7rem',
            ':hover': {
              backgroundColor: '#E8E8E8',
            },
          }}
        >
          {' '}
          Forums (Coming Soon)
        </Box>
      </Link>
      <Link style={menuStyle}>
        <Box
          sx={{
            borderRadius: '8px',
            p: '0.7rem',
            ':hover': {
              backgroundColor: '#E8E8E8',
            },
          }}
        >
          {' '}
          Meetups (Coming Soon)
        </Box>
      </Link>
    </Stack>
  );
};

export default CommunityCard;
