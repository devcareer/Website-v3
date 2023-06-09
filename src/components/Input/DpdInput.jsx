import { FormLabel, Stack, TextField, Typography } from '@mui/material';
import React from 'react';

const DpdInput = (props) => {
  const {
    name,
    label,
    multiline = false,
    required = false,
    updateForm,
  } = props;
  const changeHandler = (e) => {
    updateForm(e.target.name, e.target.value);
  };
  return (
    <Stack gap="10px">
      <FormLabel sx={{ fontWeight: '700', color: 'text.grey.800' }}>
        {label}
        {required && (
          <Typography component="span" color="#CB2B11">
            *
          </Typography>
        )}
      </FormLabel>
      <TextField
        required={true}
        multiline={multiline ? true : false}
        rows={multiline ? 4 : 0}
        name={name}
        onChange={changeHandler}
      />
    </Stack>
  );
};

export default DpdInput;
