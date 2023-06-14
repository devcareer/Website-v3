import { FormLabel, TextField,Stack } from '@mui/material';

const TextArea = ({name,value,onChange}) => {
  return (
    <Stack direction='column' gap={0.5}>
        <FormLabel sx={{fontWeight:"700",color:"#363636"}}>What would you like to tell us? *</FormLabel>  
      <TextField
      onChange={onChange}
      name={name}
      value={value}
        multiline
        rows={4}
      />
    </Stack>
  )
}

export default TextArea