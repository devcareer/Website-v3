import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { donation } from '../../assets/Images';
import SupportCard from './SupportCard';
import SupportDonateCard from './SupportDonateCard';
import { patreon, Gofundme, resources, donate } from '../../assets/Images'

const Support = () => {
  return (
   <Container maxWidth="false" disableGutters sx={{pb:"61px"}}>
    <Container sx={{ backgroundImage: `url(${donation})`, backgroundSize: "cover", backgroundRepeat: "no-repeat"}} maxWidth="false" disableGutters>
      <Container sx={{ pt: "220px", pb: "220px"}} >
        <Typography component="h1" fontWeight={700} fontSize="56px" color="#FEFEFE" display="flex" flexDirection="column">
          <Typography component="span" sx={{font: "inherit"}}>
            Support our Mission of
          </Typography>
          <Typography component="span"  sx={{font: "inherit"}} >
            Accessibility and Opportunity
          </Typography>  
        </Typography>
       
        <Button variant="contained" sx={{
                        width: "100%",
                        maxWidth: "440px",
                        py: "24px",
                        color: "#FEFEFE",
                        mt: "83px",
                        borderRadius: "8px",
                        fontSize: "16px",
                    }}>Donate Now</Button>
      </Container>
    </Container>
    <Container>
        <Typography component="h1" variant="body1" fontSize="16px" sx={{ color: (theme)=>theme.palette.text.grey[600]}} mt="56px">Unlock the Potential of Aspiring Techies</Typography>
        <Typography component="h2" variant="h2" fontWeight={700} fontSize="56px" sx={{mt: "8px"}} color="#181818">How to Support DevCareer</Typography>
        <Box maxWidth="908px">
          <Typography fontSize="20px" sx={{ color: (theme)=>theme.palette.text.grey[700], mt:"32px"}}>
            At DevCareer.io, we're on a mission to level the playing field for aspiring developers. Your support helps us provide accessible tech education through coding courses, mentorship, and career guidance.
          </Typography>            
          <Typography fontSize="20px" sx={{ color: (theme)=>theme.palette.text.grey[700], mt:"32px"}}>
            Together, let's unlock their potential and create lasting change.
            Donate today to empower dreams!
          </Typography>   
        </Box>
        
    </Container>
    <Container sx={{mt:"53px"}} >
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap="23px"> 
          <SupportDonateCard image={donate} title="Make A Donation Today" text="Your contribution fuels dreams and transforms lives. Donate now and make a lasting impact.
                                             " btntxt="Donate now"/>
          <SupportCard image={patreon}  text="Your contribution fuels dreams and transforms lives. Donate now and make a lasting impact.
                                             Your contribution fuels dreams and transforms lives. Donate now and make a lasting impact." btntxt="Become Patreon"/>
          <SupportCard image={Gofundme} text="Your contribution fuels dreams and transforms lives. Donate now and make a lasting impact.
                                             Your contribution fuels dreams and transforms lives. Donate now and make a lasting impact." btntxt="Donate With GoFundMe"/>
          <SupportCard image={resources} text="Your contribution fuels dreams and transforms lives. Donate now and make a lasting impact.
                                         Your contribution fuels dreams and transforms lives. Donate now and make a lasting impact." btntxt="Contact Us"/>
      </Box>
    </Container>
   </Container> 
   
  )
}

export default Support;