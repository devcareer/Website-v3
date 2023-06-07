import React from 'react';
import { Typography, Box, Button } from '@mui/material';

const SupportCard = ({image, name, text, title, btntxt }) => {
    return (
        <Box>
            <Box>
                <img src={ image } alt={name} /> 
            </Box>
            <Typography component="h1" variant="h4">
                {title}
            </Typography>
            <Typography fontSize="20px" sx={{ color: (theme)=>theme.palette.text.grey[700]}}>{text}</Typography>
            <Button sx={{bgcolor: "#FEFEFE", width: "100%", maxWidth: "440px" }}> {btntxt}</Button>
        </Box>
    )
}

export default SupportCard;