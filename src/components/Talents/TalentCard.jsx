import { Box, Button, Stack, Typography,Chip } from '@mui/material';
import React from 'react';
import {
  magicpen,
  ranking,
  search,
  talentLinkedin,
  talentWeb,
} from '../../assets/Images';
import { BriefCase } from '../index';

const TalentCard = ({data}) => {
  return (
    <Box sx={{ border: '1px solid #E0E0E0', borderRadius: '8px',maxWidth:"392px",padding:"24px" }}>
      <Box >
        <Typography variant="body1" color="initial" sx={{fontWeight:"700",fontSize:"24px"}}>
          {data.fullName}
        </Typography>
        <Typography variant="body1" color="initial" sx={{color:"#888888"}}>
          {data.company}
        </Typography>
      </Box>
      <Stack direction='row' justifyContent='space-between'  mt={2}>
        <Stack direction='row' alignItems='center' gap={1.5}>
          <Box>
            <img src={ranking} alt="ranking" />
          </Box>
          <Typography variant="body1" color="initial" sx={{fontSize:"12px",color:"#181818"}}>
            Experience
          </Typography>
        </Stack>
        <Typography variant="body1" color="initial" sx={{fontSize:"12px",color:"#181818",fontWeight:"600"}}>
          {data.experience}
        </Typography>
      </Stack>
      <Stack direction='row'  justifyContent='space-between'  mt={2}>
        <Stack direction='row'  gap={1.5}>
          <Box>
            <img src={search} alt="search" />
          </Box>
          <Typography variant="body1" color="initial" sx={{fontSize:"12px",color:"#181818"}}>
            Availability
          </Typography>
        </Stack>
        {/* <Chip label="Fullstack Engineering" sx={{backgroundColor:"#E6F9F5",color:"#184E77"}} /> */}
        <Chip icon={<BriefCase/>} label={data.availability} variant="outlined" sx={{outline:"#E0E0E0",fontWeight:"600",color:"#181818"}}/>
      </Stack>
      <Stack direction='row'  justifyContent='space-between' mt={2}>
        <Stack direction='row' alignItems='center'  gap={1.5} >
          <Box >
            <img src={magicpen} alt="search" />
          </Box>
          <Typography variant="body1" color="initial" sx={{fontSize:"12px",color:"#181818"}}>
            Skills
          </Typography>
        </Stack>
        <Chip label={data.skill} sx={{backgroundColor:"#E6F9F5",color:"#184E77",fontWeight:"600"}} />
      </Stack>
      <Stack direction='row'  justifyContent='space-between' mt={3} gap={4}>
        <Stack direction='row' alignItems='center' gap={0.8}>
          <Box component='a' href={data.linkedIn}>
            <img src={talentLinkedin} alt="linkedin" />
          </Box>
          <Box>
            <img src={talentWeb} alt="web" />
          </Box>
        </Stack>
        <Button component='a' href={`mailto:${data.emailAddress}`} variant='contained' disableElevation  sx={{width:"190px",color:"white",borderRadius:"8px"}} >Hire Now</Button>
      </Stack>
    </Box>
  );
};

export default TalentCard;
