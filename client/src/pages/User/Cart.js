import React, { useState, useEffect } from 'react'
import './User.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button, Fab, IconButton, Box, Typography, Modal, Snackbar, TextField } from '@mui/material'
import { QrCodeScanner, ArrowForward, IndeterminateCheckBox, AddBox, Close, AlignVerticalBottomSharp } from '@mui/icons-material/';
import BackButton from '../../components/BackButton/BackButton';
import Axios from 'axios'
import Shampoo from '../../assets/shampoo.png'
import { QrReader } from 'react-qr-reader'
import Card from '../../assets/card.png'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function Cart() {

  let { state } = useLocation();
  const navigate = useNavigate();

  //Modal Open/Close
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    window.location.reload(false);
  }

  //Modal Open/Close
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => {
    setOpen2(false);
    window.location.reload(false);
  }

  const [name, setName] = useState("");
  const [scanStatus, setscanStatus] = useState("Scan a product");
  const [wrong, setwrong] = useState("");

  const check = () => {
    Axios.post('http://localhost:3002/api/getname', { name: name })
      .then((response) => {

        if (response.data.message) {
          setscanStatus(response.data.message)
          console.log("not found bro")
        } else {
          //insert into cart code
          Axios.post('http://localhost:3002/api/insertintocart', { vid: state.cartId, cid: state.userId, pid: name })
          setOpen(false);
          setscanStatus("Scan a product");
          setName("");
          window.location.reload(false);
        }

        console.log(response);
      })
  }

  function goback() {
    navigate("/home", { state: { userEmail: state.userEmail } });
  }

  const handlepayment = () => {
    Axios.post('http://localhost:3002/api/createpayment', { cid: state.userId, total: totalprice, vid: state.cartId })
    setOpen2(false);
    alert("Payment completed successfully")
    alert.onClose(navigate("/home", { state: { userEmail: state.userEmail } }));
    window.location.reload(false);
  }

  const deleteall = () => {
    Axios.post('http://localhost:3002/api/deleteallcartitems', { vid: state.cartId, cid: state.userId })
    window.location.reload(false);
  }

  const [prodList, setProdList] = useState([]);
  const [totalprice, setTotalPrice] = useState("Hey");

  useEffect(() => {
    Axios.post("http://localhost:3002/api/getcartitems", { vid: state.cartId, cid: state.userId }).then((data) => {
      setProdList(data.data)
    });

    Axios.post("http://localhost:3002/api/gettotalcartprice", { vid: state.cartId, cid: state.userId }).then((data, vid) => {
      setTotalPrice(parseInt(data))
      console.log("Virtual Cart id:" + vid)
      console.log("Test value:" + (data.data))
      console.log("this is the total:" + totalprice)
      setTotalPrice(data.data[0]["SUM(price)"]);
    });
  }, [])

  return (
    <div className='User-column'>
      <div className='CartScan-container'>
        <div className='User-row'>
          <a onClick={goback} style={{ textDecoration: 'none', margin: 0 }}><h1>&larr;</h1></a>
          <h1 style={{ fontSize: '25px' }}>Cart</h1>
          <Button variant='text' style={{ textTransform: 'none' }} onClick={deleteall}>Delete</Button>
        </div>

        <p>All the items you have added are present here ;)</p>
        {/* <p>{state.cartId}</p>
        <p>{state.userId}</p> */}
        {/* <p>{userid}</p> */}

        <div className='Cart-itemscroll'>
          {prodList.map((val, key) => {

            return (
              <div className='Cart-itemsContainer'>
                <img src={val.pimg} height='100%'
                  style={{ padding: '10px', backgroundColor: '#e9edff', borderRadius: '5px' }}>
                </img>
                <p>{val.pname}</p>
                {/* <input type='number' style={{display: 'none'}} onChange={() => setTotalPrice(totalprice + 100)}>{val.price}</input> */}
                <p>{val.price}</p>
                <div style={{ height: '40px' }} className='User-row'>
                  <IconButton aria-label="Remove" color='primary'><IndeterminateCheckBox /> </IconButton>
                  <p>1</p>
                  <IconButton aria-label="Add" color='primary'><AddBox /></IconButton>
                </div>
              </div>
            )
          })}
        </div>

        <div className='Cart-bottomsheet'>
          <div className='Cart-spacerow'>
            <div>
              <p>Total Items</p>
              <p>Amount to be paid</p>
              {/* <p style={{ fontWeight: 'bold', color: '#1565c0' }}>View Bill</p> */}
            </div>
            <div>
              <p>{prodList.length}</p>
              {/* <p>299</p> */}
              <p>{totalprice}</p>

            </div>
          </div>

          <div className='Cart-spacerow'>
            {/* <Link to="/scan" className='Cart-fab'> */}
            <div className='Cart-fab'>
              <Fab color="success" aria-label='scan' onClick={handleOpen}>
                <QrCodeScanner />
              </Fab>
            </div>
            {/* </Link> */}

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div style={{ width: '100%' }}>
                  <QrReader
                    // delayScan={delayScan}
                    constraints={{ facingMode: 'environment' }}
                    onResult={(result, error) => {
                      if (result) {
                        setName(result?.text);
                        setscanStatus('The product you have scanned is');
                        setwrong('Wrong Product? Please scan again ;)');
                        // check();
                      }

                      if (!!error) {
                        console.info(error);
                      }
                    }}
                  />
                </div>
                <div className='User-column'>
                  <p>{scanStatus}<br />{name}</p>
                  <input type="text" value={name} placeholder="Name" name='name' style={{ display: 'none' }}></input>
                  <Button onClick={check} variant="contained"
                    style={{
                      backgroundColor: '#fff', color: '#1565c0',
                      textTransform: 'none', borderRadius: '50px'
                    }}>
                    Add to Cart</Button>
                  <p>{wrong}</p>
                </div>
              </Box>
            </Modal>


            <Button variant='contained'
              onClick={handleOpen2}
              style={{
                width: '100%', textTransform: 'none',
                height: '50px', borderRadius: '50px'
              }}>
              Proceed to Checkout
            </Button>

            <Modal
              open={open2}
              onClose={handleClose2}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div className='User-column'>
                  <h4>Payment Page</h4>
                  <img src={Card} height='200px'></img>
                  <TextField label="Card No"
                    variant="outlined" fullWidth margin='normal' size='small'
                    type='email'
                  />
                  <TextField label="CVV"
                    variant="outlined" fullWidth margin='normal' size='small'
                    type='email'
                  />
                  <p><br />Total Items taken: {prodList.length}</p>
                  <p>Total amount: Rs.{totalprice}</p>

                  <input type="text" value={totalprice} placeholder="Name" name='total' style={{ display: 'none' }}></input>

                  <Button variant='contained'
                    onClick={handlepayment}
                    style={{
                      width: '100%', textTransform: 'none',
                      height: '50px', borderRadius: '50px'
                    }}>
                    Complete Payment
                  </Button>

                </div>
              </Box>
            </Modal>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart