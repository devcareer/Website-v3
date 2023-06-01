import TalentCard from './TalentCard'
import { Box, Typography } from '@mui/material'
const Talents = () => {
  return (
    <div>
        <Box sx={{backgroundColor:"red"}}>
          <Typography variant="body1" color="initial">Discover Outstanding Talents</Typography>
          <Typography variant="body1" color="initial">Browse through our curated collection of profiles and get inspired by the diverse range of skills and expertise showcased by our community members.</Typography>
        </Box>
        <TalentCard/>
    </div>
  )
}

export default Talents