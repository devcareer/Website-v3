import { Typography } from '@mui/material';

export const BankTransferTitle = ({ children }) => {
  return (
    <Typography
      component="h2"
      variant="subtitle2"
      fontWeight={700}
      color="text.grey.400"
      fontFamily="'DM Sans', sans-serif"
      textTransform="uppercase"
    >
      {children}
    </Typography>
  );
};
