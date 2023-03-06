import React from 'react'
import './User.css'
import { Link } from 'react-router-dom'
import { Fab, IconButton } from '@mui/material'
import {QrCodeScanner, ArrowForward, Remove, Add} from '@mui/icons-material/';
import BackButton from '../../components/BackButton/BackButton';

function Cart() {
  return (
    <div className='User-header User-column'>
      <Link to="/home">
        <BackButton />
      </Link>
      <div className='CartScan-container'>
        
        <h1>Cart</h1>
        <p>All the items you have added are present here ;)</p>
        
        <div>
          <div className='Cart-itemsContainer'>
            Dove Shampoo
            <div style={{height: '40px'}} className='User-row'>
              <IconButton aria-label="Remove"> <Remove /> </IconButton>
              <p>1</p>
              <IconButton aria-label="Add"> <Add /> </IconButton>
            </div>
          </div>
          <div className='Cart-itemsContainer'>
            Dove Shampoo
            <div style={{height: '40px'}} className='User-row'>
              <IconButton aria-label="Remove"> <Remove /> </IconButton>
              <p>1</p>
              <IconButton aria-label="Add"> <Add /> </IconButton>
            </div>
          </div>
          <div className='Cart-itemsContainer'>
            Dove Shampoo
            <div style={{height: '40px'}} className='User-row'>
              <IconButton aria-label="Remove"> <Remove /> </IconButton>
              <p>1</p>
              <IconButton aria-label="Add"> <Add /> </IconButton>
            </div>
          </div>
        </div>
        
        <Link to="/scan">
            <Fab color="primary" aria-label='scan'>
                <QrCodeScanner />
            </Fab>
        </Link>

        <Fab color="success" variant='extended'>
          Proceed
          <ArrowForward />
        </Fab>

      </div>
    </div>
  )
}

export default Cart