import { Box, Grid, Typography,Stack,Button,Paper,IconButton,InputBase } from '@mui/material';
import { talents } from '../../talents';
import TalentCard from './TalentCard';
import { search } from '../../assets/Images';
import { useState } from 'react';
const Track=[
  {
    id:1,
    title:"All"
  },
  {
    id:2,
    title:"Design"
  },
  {
    id:3,
    title:"Frontend Eng."
  },
  {
    id:4,
    title:"Backend Eng."
  },
  {
    id:5,
    title:"Fullstack Eng."
  }
]
const Talents = () => {

  const [isBlue,setIsBlue]=useState(null)
  const handleClick=(id)=>{
    
       if(isBlue===null){
        setIsBlue(id)
       }else{
        setIsBlue(null)
       }
  }
  return (
    <Box pt={3} pb={10} sx={{maxWidth:"1200px",mx:"auto"}}>
      <Box sx={{ background: 'linear-gradient(to left top,  #00B964,#1E6091)',padding:"48px",borderRadius:"8px" }}>
        <Typography variant="body1" color="initial" sx={{fontSize:"64px",fontWeight:"700",color:"#FEFEFE"}}>
          Discover Outstanding Talents
        </Typography>
        <Typography variant="body1"  sx={{fontSize:"20px",color:"#FEFEFE"}}>
          Browse through our curated collection of profiles and get inspired by
          the diverse range of skills and expertise showcased by our community
          members.
        </Typography>
      </Box>
      <Box sx={{paddingTop:"40px",paddingBottom:"15px"}}>
        <Paper elevation={0}  sx={{border:"1px solid #E0E0E0",borderRadius:"8px",maxWidth:"500px",padding:"16px"}}>
        <IconButton type="button" sx={{ p: '10px',height:"24px", mt:"-4px" }} aria-label="search">
        <img src={search} alt="" />
      </IconButton>
      <InputBase
        sx={{ ml: 0.3, flex: 1,fontSize:"20px" }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
        </Paper>
      </Box>
       <Box>
       <Stack direction='row' py={3} gap={2}>
             {Track.map(item=>{
              return(
                <Button  onClick={()=>handleClick(item.id)}  variant='outlined' key={item.id}  sx={{ borderRadius:'80px',p:"1rem",color:"#1E6091",border:"1px solid #1E6091",":hover":{
                  border:"1px solid #1E6091"
                }}}>{item.title}</Button>
              )
             })}
             
             
           </Stack>
       </Box>
      <Grid container  spacing={1.8}>
        {talents.map((item) => {
          return (
            <Grid item sx={4} key={item.id}>
              <TalentCard data={item} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Talents;
