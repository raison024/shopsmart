import { Button } from '@mui/material'
import { React, useState } from 'react'
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom'
import './User.css'
import Navbar from '../../components/Navbar/Navbar'
import Poster from '../../assets/poster.png'
import Shampoo from '../../assets/shampoo.png'
import AddCartIcon from '@mui/icons-material/AddShoppingCart';
import Card from '../../components/ProductCard/Card'

function UserHome() {
  const navigate = useNavigate();
  const location = useLocation();

  const [num, setNum] = useState(0);
  // const cartid = location.state.cartid;

  function randomNumberInRange(min, max) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomclick() {
    setNum(randomNumberInRange(1, 200));
    navigate("/cart" , { state: { cartId: (randomNumberInRange(1,200)) } });
  };

  const i = [0,1,2,3,4,5,6,7];
  return (
    <div className='User-header User-column'>
      <Navbar />
      <div className='User-paddingcontainer'>
        <img src={Poster} width='100%' className='User-poster'></img>
        <p>{num}</p>
        <h3 style={{ margin: '0' }}><br />Products bought most</h3>
        <br />
        <div className='User-grid'>
          
        {i.map((i) => (
          <Card />
        ))}
          

        </div>
        

      </div>
      {/* <Link to="/cart" state={{cartid:{num}}}  className='User-generate' onClick={randomclick} > */}
        <Button variant='contained' startIcon={<AddCartIcon />}
          onClick={randomclick}
          style={{ borderRadius: '50px', textTransform: 'none', paddingBlock: '15px' }}>
          Generate Virtual Cart</Button>
      {/* </Link> */}
    </div>
  )
}

export default UserHome