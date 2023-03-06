import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function UserHome() {
  return (
    <div>Welcome User
        <Link to="/cart">
            <Button>Generate Virtual Cart</Button>
        </Link>
    </div>
  )
}

export default UserHome