import { Box, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
const ProgramCard = () => {
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
          Laptop4Developers{' '}
        </Box>
      </Link>
      <Link to="/programs/dpds" style={menuStyle}>
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
          DPDs (In partnership with AltSchool Africa)
        </Box>
      </Link>
    </Stack>
  );
};
export default ProgramCard;
