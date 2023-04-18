import { Button } from '@mui/material'
import { React, useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './User.css'
import UserNavbar from '../../components/Navbar/UserNavbar'
import Poster from '../../assets/poster.png'
import Shampoo from '../../assets/shampoo.png'
import AddCartIcon from '@mui/icons-material/AddShoppingCart';
import Axios from 'axios'

function UserHome() {
  const navigate = useNavigate();
  let { state } = useLocation();

  const [email, setEmail] = useState("No email");
  const [userid, setUserId] = useState();
  const [name, setName] = useState('Your name');

  const [num, setNum] = useState(0);
  // const cartid = location.state.cartid;

  function randomNumberInRange(min, max) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randomclick() {
    setNum(randomNumberInRange(1, 200));
    navigate("/cart", { state: { cartId: (randomNumberInRange(1, 200)), userId: userid, userEmail: email } });
  };

  const [prodList, setProdList] = useState([]);

  // function getusername(event) {
  //   event.preventDefault();
  //   alert("clicked")
  //   Axios.post('http://localhost:3002/api/getusername', { email: state.userEmail })
  //     .then(response => {
  //       const data = response.data;
  //       if (data.error) {
  //         console.error(data.error);
  //       } else if (!data.cname) {
  //         console.log('User not found');
  //       } else {
  //         setName(data.cname);
  //       }
  //     })
  //     .catch(error => console.error(error));
  // }

  useEffect(() => {
    Axios.get("http://localhost:3002/api/getallproducts").then((data) => {
      setProdList(data.data)
    });

    //  getusername();

    Axios.post('http://localhost:3002/api/getusername', { email: state.userEmail })
      .then(response => {
        const data = response.data;
        if (data.error) {
          console.error(data.error);
        } else if (!data.cname) {
          console.log('User not found');
        } else {
          setName(data.cname);
        }
      })
    Axios.post('http://localhost:3002/api/getuserid', { email: state.userEmail })
      .then(response => {
        const data = response.data;
        if (data.error) {
          console.error(data.error);
        } else if (!data.cid) {
          console.log('User not found');
        } else {
          setUserId(data.cid);
        }
      })

    setEmail(state.userEmail);
  }, [])

  return (
    <div className='User-header User-column'>
      <UserNavbar />
      <div className='User-paddingcontainer'>
        <img src={Poster} width='100%' className='User-poster'></img>
        <p style={{ display: 'none' }}>{num}</p>
        <h4 style={{ margin: '0' }}><br />All Products</h4>
        {/* <p>{email}</p>
        <p>{name}</p>
        <p>{userid}</p> */}
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
              </div>
            </div>
          ))}


        </div>


      </div>
      {/* <Link to="/cart" state={{cartid:{num}}}  className='User-generate' onClick={randomclick} > */}
      <Button variant='contained' startIcon={<AddCartIcon />}
        onClick={randomclick}
        className='User-gencart'
        style={{ borderRadius: '50px', textTransform: 'none', paddingBlock: '15px', position: 'fixed', bottom: '15px' }}>
        Generate Virtual Cart</Button>
      {/* </Link> */}
    </div>
  )
}

export default UserHome