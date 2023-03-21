import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import './User.css'
import Navbar from '../../components/Navbar/Navbar'
import Poster from '../../assets/poster.png'
import Shampoo from '../../assets/shampoo.png'
import AddCartIcon from '@mui/icons-material/AddShoppingCart';
import Card from '../../components/ProductCard/Card'

function UserHome() {
  const i = [0,1,2,3,4,5,6,7];
  return (
    <div className='User-header User-column'>
      <Navbar />
      <div className='User-paddingcontainer'>
        <img src={Poster} width='100%' className='User-poster'></img>
        <h3 style={{ margin: '0' }}><br />Products bought most</h3>
        <br />
        <div className='User-grid' style={{width: '100%'}}>
          
        {i.map((i) => (
          <Card />
        ))}
          

        </div>
        

      </div>
      <Link to="/cart" className='User-generate'>
        <Button variant='contained' startIcon={<AddCartIcon />}
          style={{ borderRadius: '50px', textTransform: 'none', paddingBlock: '15px' }}>
          Generate Virtual Cart</Button>
      </Link>
    </div>
  )
}

export default UserHome