import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  Button as MuiButton,
  IconButton,
  Typography,
  DialogContent,
  Box,
  styled,
  SvgIcon,
  OutlinedInput as MuiOutlinedInput,
  FormControl,
  InputAdornment,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  InputLabel,
  InputBase,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ReactComponent as Dollar } from '../../assets/Images/dollar-circle.svg';
import { ReactComponent as Edit } from '../../assets/images/edit-input.svg';

const DonateModal = () => {
  const [amount, setAmount] = useState(500);
  const [inputAmount, setInputAmount] = useState('');

  const handleChangeAmount = (event) => {
    // setAmount(event.target.value);
    const amt = parseInt(event.target.value);
    setAmount(amt);
    setInputAmount('');
  };

  const handleChangeInputAmount = (event) => {
    setInputAmount(event.target.value);
    setAmount(null);
  };

  return (
    <Dialog open={true}>
      <Box sx={{ display: 'flex', columnGap: '30px', alignItems: 'center' }}>
        <Typography
          component="h1"
          variant="h3"
          color="primary.main"
          fontWeight={700}
          fontSize="32px"
        >
          Make A Donation Today
        </Typography>
        <IconButton sx={{ color: 'primary.main' }}>
          <CloseIcon sx={{ fontSize: '32px' }} />
        </IconButton>
      </Box>
      <DialogContent>
        <Box>
          <Typography
            component="h2"
            variant="body1"
            fontWeight={700}
            color="text.grey.400"
            fontFamily="'DM Sans', sans-serif"
            textTransform="uppercase"
          >
            Select Amount
          </Typography>
          <Box
            sx={{
              border: '1px solid #F4F4F4',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              py: '8px',
              px: '16px',
              columnGap: '8px',
              maxWidth: 'fit-content',
            }}
          >
            <SvgIcon
              component={Dollar}
              inheritViewBox
              sx={{ fill: 'transparent' }}
            />
            <Typography
              component="span"
              fontSize="20px"
              fontWeight={700}
              color="#212121"
            >
              {amount || inputAmount}
            </Typography>
          </Box>
          <Box display="flex" columnGap="20px" alignItems="center">
            <Button
              value={100}
              onClick={(event) => handleChangeAmount(event)}
              isSelected={amount === 100}
            >
              $100
            </Button>
            <Button
              value={200}
              onClick={(event) => handleChangeAmount(event)}
              isSelected={amount === 200}
            >
              $200
            </Button>
            <Button
              value={500}
              onClick={(event) => handleChangeAmount(event)}
              isSelected={amount === 500}
            >
              $500
            </Button>
            <Button
              value={1000}
              onClick={(event) => handleChangeAmount(event)}
              isSelected={amount === 1000}
            >
              $1000
            </Button>
          </Box>
        </Box>
        <FormControl sx={{ marginTop: '16px' }} variant="outlined">
          <OutlinedInput
            placeholder="Custom Amount"
            type="number"
            value={inputAmount}
            onChange={(event) => handleChangeInputAmount(event)}
            inputProps={{ min: 1 }}
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon
                  component={Edit}
                  inheritViewBox
                  sx={{ fill: 'transparent' }}
                />
              </InputAdornment>
            }
          />
        </FormControl>
        <Box>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              <Typography
                component="h2"
                variant="body1"
                fontWeight={700}
                color="text.grey.400"
                fontFamily="'DM Sans', sans-serif"
                textTransform="uppercase"
              >
                Payment Method
              </Typography>
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Bank/Wire Transfer"
              name="radio-buttons-group"
              row
            >
              <FormControlLabel
                value="Bank/Wire Transfer"
                control={
                  <Radio
                    sx={{
                      color: (theme) => theme.palette.text.grey[200],
                      '&.Mui-checked': {
                        color: 'primary.main',
                      },
                    }}
                  />
                }
                label="Bank/Wire Transfer"
              />

              <FormControlLabel
                value="Debit Card"
                control={
                  <Radio
                    sx={{
                      color: (theme) => theme.palette.text.grey[200],
                      '&.Mui-checked': {
                        color: 'primary.main',
                      },
                    }}
                  />
                }
                label="Debit Card"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box>
          <Typography
            component="h2"
            variant="body1"
            fontWeight={700}
            color="text.grey.400"
            fontFamily="'DM Sans', sans-serif"
            textTransform="uppercase"
          >
            Personal Information
          </Typography>
          <FormControl variant="standard">
            <InputLabel
              required
              shrink
              htmlFor="bootstrap-input"
              sx={{
                color: '#363636',
                fontSize: '16px',
                fontWeight: 700,
                '& .MuiFormLabel-asterisk': {
                  color: '#CB2B11',
                },
              }}
            >
              First Name
            </InputLabel>
            <InputBase
              id="bootstrap-input"
              sx={{ border: '1px solid #C2C2C2' }}
            />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'flex-start' }}>
        <MuiButton
          variant="contained"
          sx={{
            py: '20px',
            borderRadius: '8px',
            width: '100%',
            mt: '32px',
            color: '#FEFEFE',
            maxWidth: '404px',
          }}
        >
          Donate Now
        </MuiButton>
      </DialogActions>
    </Dialog>
  );
};

const Button = styled(MuiButton)(({ isSelected, theme }) => ({
  border: '1px solid #E0E0E0',
  borderRadius: '8px',
  color: '#363636',
  padding: '8px 16px',
  backgroundColor: isSelected ? theme.palette.primary.main : '#FEFEFE',

  '&:hover': {
    backgroundColor: isSelected ? theme.palette.primary.main : '#FEFEFE',
  },
}));

const OutlinedInput = styled(MuiOutlinedInput)({
  'input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
    webkitAppearance: 'none',
    margin: 0,
  },
  // input[type="number"] {
  //   -moz-appearance: textfield;
  // }
});

export default DonateModal;
