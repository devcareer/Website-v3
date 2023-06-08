import React from 'react';
import { Typography, Box, Button } from '@mui/material';


const SupportCard = ({image, name, text, btntxt }) => {
    return (
        <Box sx={{px: "56px", py: "32px", border: "1px solid #C2C2C2", borderRadius: "8px"}} display="grid" gridTemplateRows="1fr 1fr" justifyItems="center" >
            <Box component="img" src={ image } alt={name} alignSelf="center"  /> 
            <Box display="flex" flexDirection="column" alignItems="center" alignSelf="end" mt="15px">
                <Typography fontSize="20px"  sx={{ color: (theme)=>theme.palette.text.grey[700]}}>{text}</Typography>
                <Button variant="outlined"  sx={{bgcolor: "#FEFEFE", color:(theme)=>theme.palette.text.grey[700], borderColor: "#C2C2C2", py: "24px", borderRadius: "8px", width: "100%", mt:"32px", textTransform: "capitalize"}}>{btntxt}</Button>
            </Box>
        </Box>
    )
}

export default SupportCard;