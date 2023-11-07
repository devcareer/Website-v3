import { FormLabel, Stack, TextField, Typography } from '@mui/material';
import React from 'react';

const DpdInput = (props) => {
  const {
    name,
    label,
    value,
    type,
    multiline = false,
    required = false,
    updateForm,
    updateValidity,
    error,
    id,
    onChange,
    onBlur,
  } = props;
  const changeHandler = (e) => {
    updateForm(e.target.name, e.target.value);
  };
  // We utilised this component for the DCTP form and as at then, we did manual validations which required us to write functions that updated a "big form object" with our values using the name as identifier.
  //Now I wanna utilise this same component and use formik for validations, that way I can pass onChange swiftly, this component onChnage function will then be the onChange props passed for the newer(web5) forms and the 'radioChangeHandler' for the older form, i.e dctp...
  const blurHandler = (e) => {
    updateValidity(e.target.id);
  };
  return (
    <Stack gap="10px">
      <FormLabel
        sx={{ fontWeight: '700', color: 'text.grey.800' }}
        error={!!error}
      >
        {label}
        {required && (
          <Typography component="span" color="#CB2B11" fontSize="20px">
            *
          </Typography>
        )}
        {/* {!required && (
          <Typography component="span" ml="5px">
            (Optional)
          </Typography>
        )} */}
      </FormLabel>
      <TextField
        type={type ?? 'text'}
        error={!!error}
        required={true}
        multiline={multiline ? true : false}
        rows={multiline ? 4 : 0}
        name={name}
        onChange={onChange ?? changeHandler}
        id={id}
        onBlur={onBlur ?? blurHandler}
        value={value}
      />
      {error && <Typography color="#f00">{error}</Typography>}
    </Stack>
  );
};

export default DpdInput;
