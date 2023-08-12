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
  disabled,
}) => {
  return (
    <Stack direction="column" gap={0.5} width={width ?? '100%'}>
      <FormLabel
        sx={{ fontWeight: '700', color: '#363636' }}
        disabled={!!disabled}
      >
        {title}
      </FormLabel>
      <TextField
        disabled={!!disabled}
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
