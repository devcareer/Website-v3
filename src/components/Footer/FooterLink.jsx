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
                color:`${item.active?"#888888":"#d3d3d3"}` ,
                textDecoration: 'none',
                cursor:`${item.active?"pointer":"not-allowed"}`,
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
