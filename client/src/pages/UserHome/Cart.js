import React from 'react'
import { Link } from 'react-router-dom'
import { Fab } from '@mui/material'
import NavigationIcon from '@mui/icons-material/Navigation';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';

function Cart() {
  return (
    <div>
        <h1>Cart</h1>
        <Link to="/scan">
            <Fab variant="extended">
                <QrCodeScannerIcon sx={{ mr: 1 }} />
                    Scan a product
            </Fab>
        </Link>
    </div>
  )
}

export default Cart