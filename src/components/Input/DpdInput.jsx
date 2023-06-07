import { FormLabel, Stack, TextField, Typography } from '@mui/material';
import React from 'react';

const DpdInput = (props) => {
  const { label, multiline = false, required = false } = props;
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
      <TextField multiline={multiline} rows={multiline ? 4 : 0} />
    </Stack>
  );
};

export default DpdInput;
