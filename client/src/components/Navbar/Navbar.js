import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { Button } from '@mui/material'
import Logo from '../../assets/logo.png'

function Navbar() {
  return (
    <div className='Navbar'>

      {/* First Part */}
      <div className='Navbar-row'>
        <div className='Navbar-logo'>
          Shop<span style={{color: '#1565c0'}}>Smart</span>
          &nbsp;
        </div>
        |
        <div className='Navbar-linkscontainer'>
            <a href="http://" target="_blank" rel="noopener noreferrer">Home</a>
            <a href="http://" target="_blank" rel="noopener noreferrer">About</a>
            <a href="http://" target="_blank" rel="noopener noreferrer">Contact</a>
        </div>
      </div>

      {/* Second Part */}
      <div>
        <Link to="/register">
          <Button variant='text' style={{textTransform:'none', borderRadius: '100px', color: 'black'}}>Sign Up</Button>
        </Link>
        <Link to="/login">
          <Button variant='contained'
            style={{textTransform:'none', width: '90px', 
              borderRadius: '100px', paddingBlock: '8px', 
              color: 'white'}}>
            Sign In
          </Button>
        </Link>
      </div>
        
    </div>
  )
}

export default Navbar