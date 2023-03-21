import React from 'react'
import './User.css'
import { Link } from 'react-router-dom'
import { Button, Fab, IconButton } from '@mui/material'
import { QrCodeScanner, ArrowForward, IndeterminateCheckBox, AddBox } from '@mui/icons-material/';
import BackButton from '../../components/BackButton/BackButton';
import Axios from 'axios'
import Shampoo from '../../assets/shampoo.png'

function Cart() {
  return (
    <div className='User-header User-column'>
      <div className='CartScan-container'>
        <div className='User-row'>
          <Link to="/home"><h1>&larr;</h1></Link>
          <h1 style={{fontSize: '25px'}}>Cart</h1>
          <Button variant='text' style={{textTransform: 'none'}}>Delete</Button>
        </div>

        <p>All the items you have added are present here ;)</p>

        <div style={{ height: '50vh', width: '100%' }}>
          <div className='Cart-itemsContainer'>
            <img src={Shampoo} height='100%'
              style={{ padding: '10px', backgroundColor: '#e9edff', borderRadius: '5px' }}>
            </img>
            Dove Shampoo
            <div style={{ height: '40px' }} className='User-row'>
              <IconButton aria-label="Remove" color='primary'><IndeterminateCheckBox /> </IconButton>
              <p>1</p>
              <IconButton aria-label="Add" color='primary'><AddBox /></IconButton>
            </div>
          </div>


        </div>

        <div className='Cart-bottomsheet'>
          <div className='Cart-spacerow'>
            <div>
              <p>3 Items</p>
              <p>Total Discount</p>
              <p>Amount to be paid</p>
              <p style={{fontWeight: 'bold', color: '#1565c0'}}>View Bill</p>
            </div>
            <div>
              <p>hey</p>
            </div>
          </div>

          <div className='Cart-spacerow'>
            <Link to="/scan" className='Cart-fab'>
              <Fab color="success" aria-label='scan'>
                <QrCodeScanner />
              </Fab>
            </Link>
            <Button variant='contained'
              style={{
                width: '100%', textTransform: 'none',
                height: '50px', borderRadius: '50px'
              }}>
              Proceed to Checkout
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart