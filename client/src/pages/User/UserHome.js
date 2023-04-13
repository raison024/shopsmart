import { Button } from '@mui/material'
import { React, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom'
import './User.css'
import Navbar from '../../components/Navbar/Navbar'
import Poster from '../../assets/poster.png'
import Shampoo from '../../assets/shampoo.png'
import AddCartIcon from '@mui/icons-material/AddShoppingCart';
import Axios from 'axios'

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

  const [prodList, setProdList] = useState([]);

  useEffect(()=>{
    Axios.get("http://localhost:3002/api/getallproducts").then((data)=>{
    setProdList(data.data)
    });
    },[])

    // const [img, setImg] = useState([])

    // function handleImg(pimg) {
    //   console.log("Image address : " + pimg);
    //   setImg(pimg.toString('utf8'));
    //   console.log("After Image address : " + img);
    // }

  return (
    <div className='User-header User-column'>
      <Navbar />
      <div className='User-paddingcontainer'>
        <img src={Poster} width='100%' className='User-poster'></img>
        <p style={{display: 'none'}}>{num}</p>
        <h3 style={{ margin: '0' }}><br />Products bought most</h3>
        <br />
        <div className='User-grid'>
          
        {prodList.map((val, key) => (
          <div className='Card'>
          <div className='Card-column' style={{ height: '60%', width: '90%', backgroundColor: '#e9edff', marginTop: '10px', alignSelf: 'center', borderRadius: '10px' }}>
              <img src={val.pimg} height='100%'></img>
              {/* <img src={img} height='100%'></img> */}
          </div>
          <div style={{ width: '90%' }}>
              <h4>{val.pname}</h4>
              <h4>Rs. {val.price}</h4>
              <p>4.5</p>
          </div>
          </div>
        ))}
          

        </div>
        

      </div>
      {/* <Link to="/cart" state={{cartid:{num}}}  className='User-generate' onClick={randomclick} > */}
        <Button variant='contained' startIcon={<AddCartIcon />}
          onClick={randomclick}
          className='User-gencart'
          style={{ borderRadius: '50px', textTransform: 'none', paddingBlock: '15px', position: 'fixed', bottom: 0 }}>
          Generate Virtual Cart</Button>
      {/* </Link> */}
    </div>
  )
}

export default UserHome