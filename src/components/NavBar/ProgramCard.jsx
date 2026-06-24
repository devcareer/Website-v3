import { Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import nombaMark from '../../assets/Images/nomba-hackathon/nomba-mark.png';
import raenestLogo from '../../assets/Images/Raenest_Cobalt_.png';
import tbdLogo from '../../assets/Images/TBD-Logo.png';

const ONGOING_HACKATHONS = [
  {
    name: 'Nomba Hackathon 2026',
    link: '/programs/nomba-hackathon',
    sponsor: 'Nomba',
    sponsorLogo: nombaMark,
    prizePool: 'USD $6,500',
    note: 'Includes free Nomba Forward Training + certification track.',
  },
];

const STATUS_STYLES = {
  ongoing: {
    label: 'Ongoing',
    backgroundColor: '#E8F6EE',
    color: '#17633B',
  },
  past: {
    label: 'Past',
    backgroundColor: '#F1F1F1',
    color: '#5A5A5A',
  },
};

const PAST_HACKATHONS = [
  {
    name: 'Raenest Hackathon',
    link: '/programs/raenest-hackathon',
    sponsor: 'Raenest',
    sponsorLogo: raenestLogo,
    prizePool: 'Performance-based earnings',
    note: 'Task completion challenge for African freelancers.',
  },
  {
    name: 'Web5 Hackathon',
    link: '/programs/web5',
    sponsor: 'TBD',
    sponsorLogo: tbdLogo,
    prizePool: 'Over $30,000 + scholarships',
    note: 'Build challenge focused on Web5 and decentralized tech.',
  },
];

const ProgramCard = () => {
  const menuStyle = {
    color: '#2d2d31',
    textDecoration: 'none',
  };

  const renderHackathonCard = (hackathon, status) => {
    const statusStyle = STATUS_STYLES[status] || STATUS_STYLES.past;

    return (
      <Link key={hackathon.name} style={menuStyle} to={hackathon.link}>
      <Box
        sx={{
          borderRadius: '12px',
          p: '14px',
          border: '1px solid #E8E8E8',
          backgroundColor: '#FFFFFF',
          transition: 'all 0.2s ease',
          ':hover': {
            borderColor: '#D0D0D0',
            boxShadow: '0 12px 20px rgba(0,0,0,0.08)',
            transform: 'translateY(-2px)',
          },
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={1}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Box
              component="img"
              src={hackathon.sponsorLogo}
              alt={`${hackathon.sponsor} logo`}
              sx={{
                width: '30px',
                height: '30px',
                objectFit: 'contain',
              }}
            />
            {hackathon.coSponsorLogo && (
              <Box
                component="img"
                src={hackathon.coSponsorLogo}
                alt="Co-sponsor logo"
                sx={{
                  width: '30px',
                  height: '30px',
                  objectFit: 'contain',
                }}
              />
            )}
            <Typography
              sx={{
                fontSize: '12px',
                color: '#65656A',
                fontWeight: '600',
              }}
            >
              Sponsor: {hackathon.sponsor}
            </Typography>
          </Stack>
          <Box
            sx={{
              px: '8px',
              py: '3px',
              borderRadius: '999px',
              backgroundColor: statusStyle.backgroundColor,
              color: statusStyle.color,
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'none',
            }}
          >
            {statusStyle.label}
          </Box>
        </Stack>

        <Typography
          sx={{
            mt: '12px',
            fontSize: '16px',
            color: '#1B1B1F',
            fontWeight: 800,
            lineHeight: 1.3,
          }}
        >
          {hackathon.name}
        </Typography>

        <Typography
          sx={{
            mt: '8px',
            fontSize: '13px',
            color: '#3A3A40',
            fontWeight: 700,
          }}
        >
          Prize Pool: {hackathon.prizePool}
        </Typography>

        <Typography
          sx={{
            mt: '6px',
            fontSize: '12px',
            color: '#6A6A70',
            lineHeight: 1.45,
          }}
        >
          {hackathon.note}
        </Typography>
      </Box>
      </Link>
    );
  };

  return (
    <Stack
      sx={{
        p: '1rem',
        borderRadius: '16px',
        backgroundColor: '#fff',
        maxWidth: '760px',
        width: '100%',
        border: '1px solid #E8E8E8',
        boxShadow: '0 28px 48px rgba(0, 0, 0, 0.12)',
      }}
    >
      <Typography
        sx={{
          fontSize: '14px',
          color: '#6A6A70',
          fontWeight: 600,
          mb: '4px',
        }}
      >
        Browse all DevCareer hackathons
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} gap={1.2}>
        <Box sx={{ width: '100%' }}>
          <Typography
            sx={{
              fontSize: '12px',
              color: '#8A6F00',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              mb: '8px',
            }}
          >
            Ongoing Hackathons
          </Typography>
          <Stack gap={1}>{ONGOING_HACKATHONS.map((hackathon) => renderHackathonCard(hackathon, 'ongoing'))}</Stack>
        </Box>

        <Box sx={{ width: '100%' }}>
          <Typography
            sx={{
              fontSize: '12px',
              color: '#707078',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              mb: '8px',
            }}
          >
            Past Hackathons
          </Typography>
          <Stack gap={1}>{PAST_HACKATHONS.map((hackathon) => renderHackathonCard(hackathon, 'past'))}</Stack>
        </Box>
      </Stack>
    </Stack>
  );
};
export default ProgramCard;
