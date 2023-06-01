import {
  Box,
  Button,
  Container,
  Grid,
  InputBase,
  Link,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import {
  Logo,
  facebook,
  github,
  instagram,
  linkedin,
  twitter,
} from '../../assets/Images';
const Social = [twitter, linkedin, instagram, facebook, github];
const Footer = () => {
  return (
    <Box py={3} sx={{ backgroundColor: '#F4F4F4' }}>
      <Container maxWidth="lg">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mt={8}
        >
          <Stack>
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: '32px', fontWeight: '700' }}
            >
              Stay Updated
            </Typography>
            <Typography
              variant="body1"
              sx={{ width: '450px', fontSize: '20px', color: '#888888' }}
            >
              Subscribe to our newsletter to get first-hand information about
              our programs
            </Typography>
          </Stack>
          <Paper
            elevation={0}
            sx={{
              paddingInline: '16px',
              paddingBlock: '12px',
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-around',
              border: '1px solid #C2C2C2',
            }}
          >
            <InputBase
              sx={{ ml: 'auto', flex: 2, width: '350px' }}
              placeholder="Email Address"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <Button
              variant="contained"
              sx={{
                paddingInline: '32px',
                borderRadius: '8px',
                paddingBlock: '20px',
                width: '200px',
                color: 'white',
                boxShadow: '0',
              }}
            >
              Subscribe
            </Button>
          </Paper>
        </Stack>
        <Stack direction="row" alignItems="flex-start" mt={4}>
          <Grid container sx={{ gap: '48px' }}>
            <FooterLink
              title="PROGRAMS"
              link={['Laptops4Developers', 'DPDS', 'Hackathons']}
            />
            <FooterLink
              title="COMMUNITY"
              link={['Talents', 'Forums', 'Slack  Channel', 'Meetups']}
            />
            <FooterLink
              title="SCHOLARSHIPS"
              link={['with Progate', 'with Dataquest', 'with EntryLevel']}
            />
            <FooterLink
              title="RESOURCES"
              link={['Blog', 'Podcast', 'Webinars', 'Events']}
            />
            <FooterLink title="CAREERS" link={['Come Work with Us']} />
          </Grid>
          <Box>
            <img src={Logo} alt="devcareers Logo" />
          </Box>
        </Stack>
        <Stack mt={17} direction="row" justifyContent="space-between">
          <Typography variant="body1" color="#7E7E7E">
            © Copyright 2023, All Rights Reserved
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ gap: '30px', marginTop: '5px' }}
          >
            {Social.map((item) => {
              return (
                <Box sx={{ width: '24px', cursor: 'pointer' }}>
                  <img src={item} alt="" />
                </Box>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;

const FooterLink = ({ title, link }) => {
  return (
    <Stack>
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
            href={item}
            sx={{
              color: '#888888',
              textDecoration: 'none',
              cursor: 'pointer',
              paddingTop: '8px',
            }}
          >
            {item}
          </Link>
        );
      })}
    </Stack>
  );
};
