import { Box,Button } from '@mui/material'
import React from 'react'
import {error} from '../../assets/Images'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate=useNavigate()
  return (
    <Box  sx={{position:"relative",height:"100vh",display:'flex',flexDirection:"column",alignItems:"center",justifyContent:'center',backgroundColor:"#F4F5FF"}}>
         <Box
        component="img"
        src={error}
        alt="error-page"
       
      ></Box>
      <Button
      sx={{position:"absolute",color:"#fff",padding:{sm:"10px",lg:'20px'}}}
          variant="contained"
          fontSize="40px"
          onClick={()=>navigate('/')}
        >Go back home</Button>
    </Box>
  )
}

export default PageNotFound