import React from 'react'
import './Home.css'
import Navbar from '../../components/Navbar/Navbar'
import HomeImg from '../../assets/Home-img.png'
import { Button } from '@mui/material'

function Home() {
  return (
    <div className='Home-header Home-column'>
        
        <Navbar />

        {/* First Page */}
        <div className='Home-page Home-row'>
          <div style={{width: '32%', textAlign: 'left'}}>
            <h1>Simplify Your Shopping with <span style={{color: '#1565c0'}}>Shop Smart</span></h1>
            <p>We are excited to introduce our self-checkout system, which is designed to provide our customers 
              with a convenient and efficient shopping experience.</p>
            <Button variant='contained' style={{textTransform:'none', width: '150px', height: '40px'}} >Try for free</Button>
          </div>
          <img src={HomeImg} width="40%" alt='Illustration'></img>
          <div className='Home-scrolldown'>&darr; Scroll down to learn more</div>
        </div>

        {/* Second Page */}
        <div className='Home-page Home-row'>
          Second
        </div>
    
    </div>
  )
}

export default Home