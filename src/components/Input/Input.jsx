import { FormLabel, TextField, Stack, Typography } from '@mui/material';

const Input = ({
  title,
  name,
  onChange,
  value,
  placeholder,
  type,
  multiline,
  onBlur,
  error,
  width,
}) => {
  console.log(width);
  return (
    <Stack direction="column" gap={0.5} width={width ?? '100%'}>
      <FormLabel sx={{ fontWeight: '700', color: '#363636' }}>
        {title}
      </FormLabel>
      <TextField
        fullWidth={true}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur || null}
        placeholder={placeholder}
        multiline={multiline ?? false}
        type={type ?? 'text'}
        error={error ? true : false}
      />
      {error && (
        <Typography color="#f00" fontSize="14px">
          {error}
        </Typography>
      )}
    </Stack>
  );
};

export default Input;
