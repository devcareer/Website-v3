import React from 'react'
import { Typography } from '@mui/material'
import { NavLink } from 'react-router-dom'
const TopNav = () => {
  return (
    <div>
      <Typography sx={{backgroundColor:"#3d2f9f",textAlign:'center',color:"#fff",fontSize:'18px',paddingBlock:'5px',textTransform:'capitalize',px:'10px'}} >DevCareer Tech program is now open !!! <NavLink to='/government/dctp' style={{color:"white"}}>click here to apply</NavLink>  </Typography>

    </div>
  )
}

export default TopNav