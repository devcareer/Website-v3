import {
  FormControl,
  FormControlLabel,
  Radio,
  FormLabel,
  RadioGroup,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

const DpdRadio = (props) => {
  const { label, options, required = false, titleColor } = props;
  const radioChangeHandler = (event) => {};
  return (
    <FormControl>
      <FormLabel sx={{ color: titleColor, fontWeight: 700 }}>
        {label}

        {required && (
          <Typography component="span" color="#CB2B11">
            *
          </Typography>
        )}
      </FormLabel>
      <RadioGroup onChange={radioChangeHandler} name={label}>
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
