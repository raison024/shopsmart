import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { Button } from '@mui/material'
import Logo from '../../assets/logo.png'

function Navbar() {
  return (
    <div className='Navbar'>
        <div className='Navbar-logo'>
          <img src={Logo} height="30px" alt='Logo'></img>
          Shop<span style={{color: '#1565c0'}}>Smart</span>
        </div>
        <div className='Navbar-linkscontainer'>
            <a href="http://" target="_blank" rel="noopener noreferrer">Home</a>
            <a href="http://" target="_blank" rel="noopener noreferrer">About</a>
            <a href="http://" target="_blank" rel="noopener noreferrer">Contact</a>
            <Link to="/login">
              <Button variant='contained' style={{textTransform:'none', width: '100px', borderRadius: '100px'}}>Login</Button>
            </Link>
            
            
        </div>
    </div>
  )
}

export default Navbar