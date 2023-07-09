import { FormLabel, TextField, Stack } from '@mui/material';

const Input = ({
  title,
  name,
  onChange,
  value,
  placeholder,
  type,
  multiline,
}) => {
  return (
    <Stack direction="column" gap={0.5}>
      <FormLabel sx={{ fontWeight: '700', color: '#363636' }}>
        {title}
      </FormLabel>
      <TextField
        fullwidth="true"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        multiline={multiline ?? false}
        type={type ?? 'text'}
      />
    </Stack>
  );
};

export default Input;
