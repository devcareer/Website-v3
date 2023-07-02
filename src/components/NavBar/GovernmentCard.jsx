import { Box, Stack, Typography } from '@mui/material';
import { ukflag } from '../../assets/Images';
import { Link } from 'react-router-dom';
const GovernmentCard = () => {
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
      <Link to="/government/dctp" style={menuStyle}>
        <Box
          
          sx={{
            display:'flex',
            gap:'1.5rem',
            borderRadius: '8px',
            p: '0.7rem',
            ':hover': {
              backgroundColor: '#E8E8E8',
            },
          }}
        >
          {' '}
           <Typography variant="body1" color="initial">UK-Nigeria Tech Hub</Typography>  <Box component='img' src={ukflag} width={30}></Box>
        </Box>
      </Link>
    </Stack>
  );
};
export default GovernmentCard;
