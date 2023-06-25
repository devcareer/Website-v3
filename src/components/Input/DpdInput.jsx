import { FormLabel, Stack, TextField, Typography } from '@mui/material';
import React from 'react';

const DpdInput = (props) => {
  const {
    name,
    label,
    multiline = false,
    required = false,
    updateForm,
    updateValidity,
    error,
    id,
    errorMessage = '',
  } = props;
  const changeHandler = (e) => {
    updateForm(e.target.name, e.target.value);
  };
  const blurHandler = (e) => {
    updateValidity(e.target.id);
  };
  return (
    <Stack gap="10px">
      <FormLabel sx={{ fontWeight: '700', color: 'text.grey.800' }}>
        {label}
        {required && (
          <Typography component="span" color="#CB2B11" fontSize="20px">
            *
          </Typography>
        )}
        {!required && (
          <Typography component="span" ml="5px">
            (Optional)
          </Typography>
        )}
      </FormLabel>
      <TextField
        error={error}
        required={true}
        multiline={multiline ? true : false}
        rows={multiline ? 4 : 0}
        name={name}
        onChange={changeHandler}
        id={id}
        onBlur={blurHandler}
      />
      {errorMessage && <Typography color="#f00">{errorMessage}</Typography>}
    </Stack>
  );
};

export default DpdInput;
