import React from 'react'
import Typography from '@mui/material/Typography';
import './Footer.css';


const Footer = () => {
  return (
    <div className='footer-container'>
        <footer style={{marginTop:'auto', paddingRight:20, textAlign:'right'}} >
    <Typography style={{marginLeft:265}}>
            PILOT CATASTROPHE &nbsp;&copy; {(new Date().getFullYear())}
    </Typography>
   </footer>
    </div>
  )
}

export default Footer


            

