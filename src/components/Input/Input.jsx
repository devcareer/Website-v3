import { FormLabel, TextField,Stack } from '@mui/material';

const Input = ({title}) => {
  return (
    <Stack direction='column' gap={0.5}>
      <FormLabel sx={{fontWeight:"700",color:"#363636"}}>{title}</FormLabel>
      <TextField fullwidth  />
    </Stack>
  );
};

export default Input;
