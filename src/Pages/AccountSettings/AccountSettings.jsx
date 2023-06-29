import { Box,Typography,Stack,Button } from '@mui/material'
import { Input } from '../../components'
import CheckIcon from '@mui/icons-material/Check';

const AccountSettings = () => {
  return (
    <Box sx={{maxWidth:"1018px",mx:'auto',px:"136px",py:"48px"}}>
<Typography variant="body1"  color='#888888' fontSize='24px'>Account Settings</Typography>
<Typography variant="body1" color="#212121" mb='8px' mt='32px' fontSize='24px' fontWeight='bold'>Change Password</Typography>
<Typography variant="body1" color="initial">
Changing your password regularly helps protect your personal information and ensures the safety of your account.
 In this section, you can easily modify your password to a new one of your choice. Please follow the instructions below to change your password and maintain the utmost security for your account.
</Typography>
 <Stack gap='16px' mt='24px'>
<Input title='Current Password' value='●●●●●●●●●●'/>
<Input title='New Password' value='●●●●●●●●●●'/>
<Input title='Confirm Password' value='●●●●●●●●●●'/>
</Stack>
<Typography variant="body1" color="initial" mt='32px'>Password Requirements:</Typography>
<Stack direction='row' ><CheckIcon sx={{color:'#05B993'}} /><Typography variant="body1" color="initial" fontSize='20px'>Be at least 8 characters long</Typography></Stack>
<Stack direction='row'><CheckIcon sx={{color:'#05B993'}} /><Typography variant="body1" color="initial"  fontSize='20px'>Contains at least one uppercase letter</Typography></Stack>
<Stack direction='row'><CheckIcon sx={{color:'#05B993'}} /><Typography variant="body1" color="initial"  fontSize='20px'>Contains at least one lowercase letter</Typography></Stack>
<Stack direction='row'><CheckIcon sx={{color:'#05B993'}} /><Typography variant="body1" color="initial"  fontSize='20px'>Contains at least one number</Typography></Stack>
<Stack direction='row' justifyContent='space-between' mt='32px'>
    <Button variant='outlined'  sx={{px:'32px',py:'24px',borderRadius:'8px'}}>Cancel</Button>
    <Button variant='contained' sx={{px:'32px',py:'24px',color:'#FEFEFE',borderRadius:'8px'}}>Apply Changes</Button>
</Stack>
    </Box>
  )
}

export default AccountSettings