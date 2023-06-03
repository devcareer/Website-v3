import {
  Box,
  Button,
  Container,
  Grid,
  InputBase,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Logo,
  facebook,
  github,
  instagram,
  linkedin,
  twitter,
} from '../../assets/Images';
import FooterLink from './FooterLink';
const Social = [twitter, linkedin, instagram, facebook, github];
const Footer = () => {
  return (
    <Box py={1} sx={{ backgroundColor: '#F4F4F4' }}>
      <Container maxWidth="lg">
        <Stack
          direction={{lg:"row"}}
          alignItems="center"
          justifyContent="space-between"
          mt={8}
        >
          <Stack>
            <Typography
              variant="body1"
              color="initial"
              sx={{ fontSize: '32px', fontWeight: '700',textAlign:{xs:"center",lg:"left"} }}
            >
              Stay Updated
            </Typography>
            <Typography
              variant="body1"
              sx={{ maxWidth: '450px', fontSize: '20px', color: '#888888',textAlign:{xs:"center",lg:"left"} }}
            >
              Subscribe to our newsletter to get first-hand information about
              our programs
            </Typography>
          </Stack>
          <Paper
            elevation={0}
            sx={{
              mt:{xs:"1rem",lg:"0"},
              paddingInline: {xs:"8px",lg:"16px"} ,
              paddingBlock:{xs:"6px",lg:"12px"} ,
              borderRadius: '8px',
              display: 'flex',
              justifyContent: 'space-around',
              border: '1px solid #C2C2C2',
            }}
          >
            <InputBase
              sx={{ ml: 'auto', flex: 2, maxWidth: '350px',width:"100%" }}
              placeholder="Email Address"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
            <Button
              variant="contained"
              sx={{
                paddingInline:{xs:"16px",lg:"32px"},
                borderRadius: '8px',
                paddingBlock: {xs:"10px",lg:"20px"},
                maxWidth: '200px',
                color: 'white',
                boxShadow: '0',
              }}
            >
              Subscribe
            </Button>
          </Paper>
        </Stack>
        <Stack direction={{xs:"column",md:"row"}}  alignItems={{xs:"center",lg:"flex-start"}} mt={4}>
          <Grid container   sx={{ gap: '48px' }}>
            <Grid item xs={6} sm={4} md={2} lg={1.7}>
            <FooterLink
              title="PROGRAMS"
              link={[
                { link: '', name: 'Laptops4Developers' },
                { link: 'programs/dpds', name: 'DPDS' },
                { name: 'Hackathons' },
              ]}
            />
            </Grid>
         <Grid item xs={4} sm={3} md={2} lg={1}>
         <FooterLink
              title="COMMUNITY"
              link={[
                { link: 'community/talents', name: 'Talents' },
                { link: '', name: 'Forums' },
                { link: '', name: 'Slack  Channel' },
                { link: '', name: 'Meetups' },
              ]}
            />
         </Grid>
          <Grid item xs={6} sm={3} md={2} lg={1.3}>
          <FooterLink
              title="SCHOLARSHIPS"
              link={[
                { link: '', name: 'with Progate' },
                { link: '', name: 'with Dataquest' },
                { link: '', name: 'with EntryLevel' },
              ]}
            />
          </Grid>
          <Grid item xs={4} md={2} lg={0.9}>
          <FooterLink
              title="RESOURCES"
              link={[
                { link: '', name: 'Blog' },
                { link: '', name: 'Podcast' },
                { link: '', name: 'Webinars' },
                { link: '', name: 'Events' },
              ]}
            />
          </Grid>
           <Grid item xs={6} md={2} >
           <FooterLink
              title="CAREERS"
              link={[{ link: '', name: 'Come Work with Us' }]}
            />
           </Grid>
           
          </Grid>
          <Box sx={{mt:{xs:"1.2rem",sm:"0"}}}>
            <Link to="/">
              <img src={Logo} alt="devcareers Logo" />
            </Link>
          </Box>
        </Stack>
        <Stack mt={8}  direction={{xs:"column-reverse" ,lg:"row"}} justifyContent="space-between">
          <Typography variant="body1" color="#7E7E7E" textAlign={{xs:"center" ,lg:"left"}} sx={{paddingBlock:{xs:"2rem", lg:"1rem"}}}>
            © Copyright 2023, All Rights Reserved,
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={{xs:"center",lg:"flex-start"}}
            sx={{ gap: '30px', marginTop: '5px' }}
          >
            {Social.map((item, index) => {
              return (
                <Box key={index} sx={{ width: '24px', cursor: 'pointer' }}>
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
