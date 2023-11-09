import {
  FormControl,
  FormControlLabel,
  Radio,
  FormLabel,
  RadioGroup,
  Typography,
} from '@mui/material';
import React from 'react';

const DpdRadio = (props) => {
  const {
    label,
    options,
    required = false,
    titleColor,
    updateForm,
    name,
    error,
    onChange,
  } = props;
  const radioChangeHandler = (e) => {
    updateForm && updateForm(e.target.name, e.target.value); // The condition is to make sure the function only triggers if 'updateForm' function is passed otherwise it throws an error if you use the component without passing the function...
  };
  // We utilised this component for the DCTP form and as at then, we did manual validations which required us to write functions that updated a "big form object" with our values using the name as identifier.
  //Now I wanna utilise this same component and use formik for validations, that way I can pass onChange swiftly, this component onChnage function will then be the onChange props passed for the newer(web5) forms and the 'radioChangeHandler' for the older form, i.e dctp...
  return (
    <FormControl error={!!error}>
      <FormLabel sx={{ color: titleColor, fontWeight: 700 }}>
        {label}

        {required && (
          <Typography component="span" color="#CB2B11">
            *
          </Typography>
        )}
      </FormLabel>
      <RadioGroup onChange={onChange ?? radioChangeHandler} name={name}>
        {options.map((opt, i) => (
          <FormControlLabel
            sx={{ color: '#363636', fontWeight: 500 }}
            key={i}
            value={opt}
            control={<Radio />}
            label={opt}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default DpdRadio;
