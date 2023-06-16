import { Box, Button } from '@mui/material';
const SocialButton = ({ text, icon,link }) => {

  return (
    <Button href={link} target="_blank" variant="outlined" startIcon={icon}  sx={{ borderRadius:"8px",width: '100%',mt:"16px",border:"1px solid#C2C2C2", ":hover":{
        border:"1px solid#C2C2C2"
    } }}>
      <Box sx={{ mr: 'auto',color:"#6D6D6D",fontSize:"18px" }}>{text}</Box>
    </Button>
  );
};

export default SocialButton;
