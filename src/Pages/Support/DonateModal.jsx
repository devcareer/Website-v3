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
import { ReactComponent as Edit } from '../../assets/Images/edit-input.svg';
import BankTransferDetails from './components/BankTransferDetails';
import { BankTransferTitle } from './components/BankTransferTitle';

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
          px: { xs: '20px', sm: '30px', md: '40px' },
          width: '90%',
          maxWidth: '550px',
          overflowX: 'hidden',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          columnGap: '30px',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '16px',
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          color="primary.main"
          fontWeight={700}
          fontSize={{ xs: '20px', md: '28px' }}
        >
          Make A Donation Today
        </Typography>
        <IconButton
          sx={{
            color: 'text.grey.700',
            position: 'absolute',
            right: { xs: '4%', sm: '4%', md: '6%' },
            top: 8,
          }}
          edge="end"
          onClick={() => handleCloseModal()}
        >
          <CloseIcon sx={{ fontSize: '28px' }} />
        </IconButton>
      </Box>
      <DialogContent
        sx={{
          px: '0',
          scrollbarWidth: 'thin',
          scrollbarColor: '#b2b2b2 #fff',

          '&::-webkit-scrollbar': {
            width: '4px',
          },

          '&::-webkit-scrollbar-track': {
            backgroundColor: '#fff',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'text.grey.400',
            borderRadius: '50px',
          },
        }}
      >
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
            rowGap={{ xs: '10px' }}
            alignItems="center"
            marginTop="20px"
            flexWrap={{ xs: 'wrap' }}
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
          <Box
            display="flex"
            rowGap={{ xs: '10px' }}
            columnGap={{ sm: '20px' }}
            marginTop="12px"
            flexDirection={{ xs: 'column', sm: 'row' }}
          >
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
              <BankTransferTitle>
                DOM ACCOUNT WIRE TRANSFER (USD)
              </BankTransferTitle>

              <BankTransferDetails
                title="Bank Name"
                text="UNITED BANK FOR AFRICA PLC, NIGERIA"
              />
              <BankTransferDetails
                title="Bank Account Name"
                text="DEVELOPERS CAREER ADVANCEMENT
                INITIATIVE"
              />
              <BankTransferDetails title="Account Number" text="3004017548" />
              <BankTransferDetails
                title="International Routing (SWIFT-BIC) Code"
                text="UNAFNGLA"
              />
            </Box>
            <Box mt="16px">
              <Box>
                <BankTransferTitle>
                  DOM ACCOUNT WIRE TRANSFER (GBP)
                </BankTransferTitle>

                <BankTransferDetails
                  title="Bank Name"
                  text="UNITED BANK FOR AFRICA PLC, NIGERIA"
                />
                <BankTransferDetails
                  title="Bank Account Name"
                  text="DEVELOPERS CAREER ADVANCEMENT
                INITIATIVE"
                />
                <BankTransferDetails title="Account Number" text="3004017555" />
                <BankTransferDetails
                  title="International Routing (SWIFT-BIC) Code"
                  text="UNAFNGLA"
                />
              </Box>
              <Box mt="16px">
                <BankTransferTitle>NAIRA ACCOUNT</BankTransferTitle>
                <BankTransferDetails
                  title="Bank Name"
                  text="UNITED BANK FOR AFRICA PLC, NIGERIA"
                />
                <BankTransferDetails
                  title="Account Name"
                  text="DEVELOPERS CAREER ADVANCEMENT
                  INITIATIVE"
                />
                <BankTransferDetails title="Account Number" text="1026010237" />
              </Box>
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
});

export default DonateModal;
