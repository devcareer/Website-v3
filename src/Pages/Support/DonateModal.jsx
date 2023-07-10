import React, { useState } from 'react';
import {
  Dialog,
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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ReactComponent as Dollar } from '../../assets/Images/dollar-circle.svg';
import { ReactComponent as Edit } from '../../assets/images/edit-input.svg';

const DonateModal = ({ showModal, onClose }) => {
  const [amount, setAmount] = useState(500);
  const [inputAmount, setInputAmount] = useState('');
  const [showBankDetails, setShowBankDetails] = useState(false);

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
  const handleCloseModal = () => {
    setShowBankDetails(false);
    onClose();
  };
  const handleShowDebitCard = () => {
    setShowBankDetails(false);
  };
  return (
    <Dialog
      open={showModal}
      onClose={() => handleCloseModal()}
      sx={{
        '& .MuiPaper-root': {
          py: '16px',
          px: '40px',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          columnGap: '30px',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          color="primary.main"
          fontWeight={700}
          fontSize="28px"
        >
          Make A Donation Today
        </Typography>
        <IconButton
          sx={{ color: 'text.grey.700' }}
          edge="end"
          onClick={() => handleCloseModal()}
        >
          <CloseIcon sx={{ fontSize: '28px' }} />
        </IconButton>
      </Box>
      <DialogContent sx={{ px: '0' }}>
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
              marginTop: '12px',
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
          <Box
            display="flex"
            columnGap="20px"
            alignItems="center"
            marginTop="20px"
          >
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
            sx={{
              borderRadius: '8px',

              '& .MuiOutlinedInput-input': {
                py: '12px',
              },
            }}
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
        <Box marginTop="24px">
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
          <Box display="flex" columnGap="20px" marginTop="12px">
            <Button
              onClick={() => setShowBankDetails(true)}
              sx={{ '& :hover': {} }}
            >
              Bank Transfer
            </Button>
            <Button onClick={() => handleShowDebitCard()}>Debit Card</Button>
          </Box>
        </Box>
        {showBankDetails && (
          <Box my="20px" mx="auto">
            <Box>
              <Typography
                component="h2"
                variant="subtitle2"
                fontWeight={700}
                color="text.grey.400"
                fontFamily="'DM Sans', sans-serif"
                textTransform="uppercase"
              >
                DOM ACCOUNT WIRE TRANSFER (USD)
              </Typography>
              <Typography
                component="p"
                variant="h6"
                color="text.grey.600"
                fontStyle="italic"
                fontSize="16px"
              >
                Bank Name: UNITED BANK FOR AFRICA PLC, NIGERIA
              </Typography>
              <Typography
                component="p"
                variant="h6"
                color="text.grey.600"
                fontStyle="italic"
                fontSize="16px"
              >
                Bank Account Name: DEVELOPERS CAREER ADVANCEMENT INITIATIVE
              </Typography>
              <Typography
                component="p"
                variant="h6"
                color="text.grey.600"
                fontStyle="italic"
                fontSize="16px"
              >
                Account Number: 3004017548
              </Typography>

              <Typography
                component="p"
                variant="h6"
                color="text.grey.600"
                fontStyle="italic"
                fontSize="16px"
              >
                International Routing (SWIFT-BIC) Code: UNAFNGLA
              </Typography>
            </Box>
            <Box mt="16px">
              <Typography
                component="h2"
                variant="subtitle2"
                fontWeight={700}
                color="text.grey.400"
                fontFamily="'DM Sans', sans-serif"
                textTransform="uppercase"
              >
                DOM ACCOUNT WIRE TRANSFER (GBP)
              </Typography>
              <Typography
                component="p"
                variant="h6"
                color="text.grey.600"
                fontStyle="italic"
                fontSize="16px"
              >
                Bank Name: UNITED BANK FOR AFRICA PLC, NIGERIA
              </Typography>
              <Typography
                component="p"
                variant="h6"
                color="text.grey.600"
                fontStyle="italic"
                fontSize="16px"
              >
                Bank Account Name: DEVELOPERS CAREER ADVANCEMENT INITIATIVE
              </Typography>
              <Typography
                component="p"
                variant="h6"
                color="text.grey.600"
                fontStyle="italic"
                fontSize="16px"
              >
                Account Number: 3004017555
              </Typography>

              <Typography
                component="p"
                variant="h6"
                color="text.grey.600"
                fontStyle="italic"
                fontSize="16px"
              >
                International Routing (SWIFT-BIC) Code: UNAFNGLA
              </Typography>
            </Box>
            <Box mt="16px">
              <Typography
                component="h2"
                variant="subtitle2"
                fontWeight={700}
                color="text.grey.400"
                fontFamily="'DM Sans', sans-serif"
                textTransform="uppercase"
              >
                NAIRA ACCOUNT
              </Typography>
              <Typography
                component="p"
                variant="h6"
                color="text.grey.600"
                fontStyle="italic"
                fontSize="16px"
              >
                Bank Name: UNITED BANK FOR AFRICA PLC, NIGERIA
              </Typography>
              <Typography
                component="h3"
                variant="h6"
                color="text.grey.600"
                fontStyle="italic"
                fontSize="16px"
              >
                Bank Account Name: DEVELOPERS CAREER ADVANCEMENT INITIATIVE
              </Typography>
              <Typography
                component="h3"
                variant="h6"
                color="text.grey.600"
                fontStyle="italic"
                fontSize="16px"
              >
                Account Number: 1026010237
              </Typography>
            </Box>
          </Box>
        )}
        <Box>
          <Typography
            sx={{
              color: '#363636',
              fontSize: '20px',
              fontWeight: '400',
              marginTop: '16px',
              '& span': {
                color: 'primary.main',
                component: 'h3',
                variant: 'h3',
                fontWeight: '700',
                fontSize: '24px',
              },
            }}
          >
            Total Donation: <span>${amount || inputAmount}</span>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const Button = styled(MuiButton)(({ isSelected, theme }) => ({
  border: '1px solid #E0E0E0',
  borderRadius: '8px',
  color: isSelected ? '#FEFEFE' : '#363636',
  padding: '8px 16px',
  backgroundColor: isSelected ? theme.palette.primary.main : '#FEFEFE',

  '&:hover': {
    backgroundColor: isSelected ? theme.palette.primary.main : '#F8F9F5',
    color: isSelected ? '#FEFEFE' : '#363636',
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
