import React from 'react';
import { Typography, Box } from '@mui/material';


const Card = ({ image, name, position, className }) => {
    return (
        <Box>
            <Box component="img" src={ image } alt={name} className={className} />
            <Typography component="h2" variant="body1" fontWeight={700} color="#181818" textTransform="uppercase">
                {name}
            </Typography>
            <Typography component="h2" variant="body1" fontWeight={500} sx={{ color: (theme)=>theme.palette.text.grey[600]}}>
                {position}
            </Typography>
        </Box>    
    )
}

export default Card;