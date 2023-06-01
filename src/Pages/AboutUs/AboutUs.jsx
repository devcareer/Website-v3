import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import Card  from './Card';
import { favour, joshua, soji, tobi, doyin, chidi, learning, Wennovation, Swahilipot, Creationhub, Kuda, Eden} from '../../assets/Images';

const AboutUs = () => {
    return (
        <Container maxWidth="false">
            <Container>
            <Box display="flex" flexDirection="column" alignItems="center" mb="73px">
                <Typography component="h1" variant="body1" mb={1} sx={{ color: (theme)=>theme.palette.text.grey[600]}}>
                    Meet The Team
                </Typography>
                <Typography component="h2" display="flex" flexDirection="column" alignItems="center">
                    <Typography component="span" variant="h3"  sx={{fontWeight:700}} >
                        Empowering African Tech Talents:
                    </Typography>
                    <Typography component="span" variant="h3"  sx={{ fontWeight:700}}>
                        Our Passionate Professionals
                    </Typography>    
                </Typography>
            </Box>
            <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" columnGap="25px" rowGap="16px">
                <Card image={ favour } name="FAVOUR CHIBUEZE" position="community"/>
                <Card image={ joshua } name="FAVOUR CHIBUEZE" position="community"/>
                <Card image={ soji } name="FAVOUR CHIBUEZE" position="community"/>
                <Card image={ tobi } name="FAVOUR CHIBUEZE" position="community"/>
                <Card image={ doyin } name="FAVOUR CHIBUEZE" position="community"/>
                <Card image={ chidi } name="FAVOUR CHIBUEZE" position="community"/>
            </Box>
            </Container>
            <Container>
                <Container>
                    <Box>
                        <Typography component="h3" variant="h2" sx={{ fontWeight:700, mt:"56px"}}>
                            Our Approach
                        </Typography>
                        <Typography component="h4" sx={{ fontWeight:400, fontSize:"24px", mt:"24px"}}>
                            DevCareer.io takes a practical, hands-on approach to software development education. Our programs offer real-world projects and challenges, teaching in-demand programming languages, frameworks, and tools. We provide mentors who guide and support students throughout their journey, offering insights and career advice.
                        </Typography>
                    </Box> 
                </Container>
                <Box component="img" src={ learning } alt='learning' width="100%"/> 
            </Container>
            <Container>
                <Typography>
                    Our Global Partners
                </Typography>
                <Box>
                    <img src={ Wennovation} alt='learning' />
                    <img src={ Creationhub } alt='learning' />
                    <img src={ Swahilipot} alt='learning' />
                    <img src={ Kuda } alt='learning' />
                    <img src={ Eden } alt='learning' />
                </Box>  
            </Container>
            <Container>
                <Box>
                   <Typography>
                        Join Hands with us as we make a change in the Tech World
                   </Typography>
                   <Button>Become A Partner</Button> 
                </Box>
            </Container>
            
        </Container>
        
    )
}

// const StyledTypography = styled(Typography)`
//     font-weight: 700;
// `;
    



export default AboutUs;