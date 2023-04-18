import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { Button } from '@mui/material'
import Logo from '../../assets/logo.png'
import Axios from 'axios'
import Avatar from '../../assets/avatar.png'

function UserNavbar() {
  let { state } = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [userid, setUserId] = useState();

  function accountclick() {
    navigate("/account", { state: { userEmail: (state.userEmail), userId: userid } });
  }

  function histclick() {
    navigate("/history", { state: { userEmail: (state.userEmail), userId: userid } });
  }

  function feedclick() {
    navigate("/feedback", { state: { userEmail: (state.userEmail), userId: userid } });
  }

  useEffect(() => {
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
  }, [])

  return (
    <div className='Navbar' style={{ color: 'black' }}>

      {/* First Part */}
      <div className='Navbar-row'>
        <div className='Navbar-logo' style={{ color: 'black' }}>
          Shop<span style={{ color: '#1565c0' }}>Smart</span>
          &nbsp;
        </div>
        |
        <div className='Navbar-linkscontainer'>
          {/* <a style={{ color: 'black' }} onClick={accountclick}>Account</a> */}
          <a style={{ color: 'black' }} onClick={histclick}>History</a>
          <a style={{ color: 'black' }} onClick={feedclick}>Feedback</a>
        </div>
      </div>

      {/* Second Part */}
      <div className='Navbar-row'>
        {/* <Link to="/register">
          <Button variant='text' style={{textTransform:'none', borderRadius: '100px', color: 'black'}}>Sign Up</Button>
        </Link> */}
        <p style={{ margin: 0 }}>Welcome, {name}</p>
        <img src={Avatar} height='60px'></img>
        <Link to="/">
          <Button variant='contained'
            style={{
              textTransform: 'none', width: '90px',
              borderRadius: '100px', paddingBlock: '8px',
              color: 'white'
            }}>
            Logout
          </Button>
        </Link>
      </div>

    </div>
  )
}

export default UserNavbar