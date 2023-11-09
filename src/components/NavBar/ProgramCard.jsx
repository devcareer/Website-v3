import { Box, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
const ProgramCard = () => {
  const menuStyle = {
    color: '#888888',
    textDecoration: 'none',
  };
  return (
    <Stack
      gap={1}
      sx={{
        p: '0.4rem',
        borderRadius: '8px',
        backgroundColor: '#fff',
        maxWidth: '288px',
        width: '100%',
        border: '1px solid #E8E8E8',
      }}
    >
      <Link style={menuStyle} to="/programs/l4d">
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
          Laptop4Developers{' '}
        </Box>
      </Link>
      <Link style={menuStyle} to="/programs/web5">
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
          Web5 Hackathon{' '}
        </Box>
      </Link>
    </Stack>
  );
};
export default ProgramCard;
