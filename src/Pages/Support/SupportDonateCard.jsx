import React from 'react';
import { Typography, Box, Button } from '@mui/material';

const SupportDonateCard = ({image, name, text, title, btntxt }) => {
    return (
        <Box sx={{px: "56px", py: "32px", border: "1px solid #C2C2C2", borderRadius: "8px"}} display="grid" gridTemplateRows="1fr 2fr" justifyItems="center">
                <Box>
                    <Typography component="h3" fontSize="32px" fontWeight={700} color="#05B993">
                        {title}
                    </Typography>
                <Typography fontSize="20px"  sx={{ color: (theme)=>theme.palette.text.grey[700]}}>{text}</Typography> 
                </Box>
                <Box alignSelf="end">
                    <Box component="img" src={ image } alt={name} alignSelf="center"  /> 
                    <Button variant="contained" sx={{py: "24px", borderRadius: "8px", width: "100%", mt:"32px", color:"#FEFEFE"}}>{btntxt}</Button>
                </Box>      
        </Box>
    )
}

export default SupportDonateCard;