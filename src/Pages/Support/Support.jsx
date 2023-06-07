import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { donation } from '../../assets/Images';
import SupportCard from './SupportCard';
import { patreon, Gofundme, resources} from '../../assets/Images'

const Support = () => {
  return (
   <Container maxWidth="false">
    <Container sx={{ backgroundImage: `url(${donation})`, backgroundSize: "cover", backgroundRepeat: "no-repeat"}} maxWidth="false">
      <Container sx={{ pt: "220px", pb: "348px"}} >
        <Typography component="h1" fontWeight={700} fontSize="56px" color="#FEFEFE">
          Support our Mission of Accessibility and Opportunity
        </Typography>
        <Button sx={{
                        bgcolor: "#037B62",
                        width: "100%",
                        maxWidth: "440px",
                        py: "24px",
                        color: "#FEFEFE",
                        mt: "83px",
                        borderRadius: "8px",
                        fontSize: "16px",

                        "&:hover": {
                            bgcolor: "#FEFEFE",      
                            color: "#037B62",
                        }
                    }}>Donate Now</Button>
      </Container>
    </Container>
    <Container>
        <Typography component="h2" variant="body1" fontSize="16px" sx={{ color: (theme)=>theme.palette.text.grey[700]}}>Unlock the Potential of Aspiring Techies</Typography>
        <Typography component="h3" variant="h2" fontWeight={700} fontSize="56px" sx={{mt: "8px"}}>How to Support DevCareer</Typography>
        <Typography fontSize="16px" sx={{ color: (theme)=>theme.palette.text.grey[700], mt: "32px"}}>At DevCareer.io, we're on a mission to level the playing field for aspiring developers. Your support helps us provide accessible tech education through coding courses, mentorship, and career guidance.
                    Together, let's unlock their potential and create lasting change.
                    Donate today to empower dreams!
        </Typography>
    </Container>
    <Container >
      <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" columnGap="23px" rowGap="24px"> 
          <SupportCard image={patreon} text="Your contribution fuels dreams and transforms lives. Donate now and make a lasting impact.
                                             Your contribution fuels dreams and transforms lives. Donate now and make a lasting impact."/>
          <SupportCard image={Gofundme} text="Your contribution fuels dreams and transforms lives. Donate now and make a lasting impact.
                                             Your contribution fuels dreams and transforms lives. Donate now and make a lasting impact."/>
          <SupportCard image={resources} text="Your contribution fuels dreams and transforms lives. Donate now and make a lasting impact.
                                             Your contribution fuels dreams and transforms lives. Donate now and make a lasting impact."/>
          <SupportCard image={patreon} text="Your contribution fuels dreams and transforms lives. Donate now and make a lasting impact.
                                         Your contribution fuels dreams and transforms lives. Donate now and make a lasting impact."/>
      </Box>
    </Container>
   </Container> 
   
  )
}

export default Support;