import { FormLabel, TextField,Stack } from '@mui/material';

const TextArea = () => {
  return (
    <Stack direction='column' gap={0.5}>
        <FormLabel sx={{fontWeight:"700",color:"#363636"}}>What would you like to tell us? *</FormLabel>  
      <TextField
        multiline
        rows={4}
        maxRows={4}
      />
    </Stack>
  )
}

export default TextArea