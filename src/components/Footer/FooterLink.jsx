import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
const FooterLink = ({ title, link }) => {
  return (
    <Stack >
      <Typography
        variant="body1"
        color="initial"
        sx={{ fontWeight: '700', paddingBottom: '10px' }}
      >
        {title}
      </Typography>
      {link.map((item) => {
        return (
          <Link
            to={item.link}
            style={{ textDecoration: 'none' }}
            key={item.name}
          >
            <Typography
              variant="body1"
              color="initial"
              sx={{
                color: '#888888',
                textDecoration: 'none',
                cursor: 'pointer',
                paddingTop: '8px',
              }}
            >
              {' '}
              {item.name}
            </Typography>
          </Link>
        );
      })}
    </Stack>
  );
};
export default FooterLink;
