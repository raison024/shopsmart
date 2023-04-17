
import React, { useState, useEffect } from 'react'
import SideBar from '../../components/Admin SideBar/SideBar'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './Stores.css'
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Axios from 'axios'


function Customers() {

  const [payments, setPayments] = useState([])
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // const style = {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   bgcolor: 'background.paper',
  //   border: '2px solid #000',
  //   boxShadow: 24,
  //   p: 4,
  //   width: 400,
  //   height: 400,
  //   justifyContent: 'center',
  //   alignItems: 'center'
  // };

  // const tableModalStyle = {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   bgcolor: 'background.paper',
  //   border: '2px solid #000',
  //   boxShadow: 24,
  //   width: 400,
  //   height: 400,
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center'
  // };

  useEffect(() => {
    Axios.get('http://localhost:3003/api/read_payments')
      .then(res => {
        console.log(res)
        setPayments(res.data)
      })
      .catch(err => console.log(err))
    console.log("Testing: " + payments)
  }, []);

  // function handlePayments(pay_id) {
    // console.log("Image address : " + pimg);
    // setImg(pimg.toString('utf8'));
    // console.log("After Image address : " + img);
  //   handleOpen();
  // }

  // const [payTable, setPayTable] = useState([])

  return (
    <div className='Admin'>
      <SideBar />
    

    <div class="AdminStores-container">
      <>
        <div className='Customers-right mt-4' style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
         <h3 >Payments</h3>
          <table className="table table-hover mt-3 table-bordered ">
            <thead>
              <tr className='table-dark'>
                <th scope="col">Payment ID</th>
                <th scope="col">Customer ID</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Virtual Cart ID</th>
                <th scope="col">Total Payment</th>
                <th scope="col">Payment Date</th>
                <th scope="col">Payment Time</th>
                {/* <th scope="col">Actions</th> */}
                {/* <th scope="col">Date of Birth</th>
                <th scope="col">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {/* <tr>
              <th scope="row">100</th>
              <td>Raymond Shirt</td>
              <td>121</td>
              <td>1230</td>
              <td>Good!</td>
              <td>4</td>


            </tr> */}
              {payments.map((payment) => {
                const dob = new Date(payment.pay_date);
                const formattedDate = dob.toLocaleDateString();
                const time = new Date(payment.pay_time)
                const formattedTime  = time.toLocaleTimeString();

                return (
                  <tr key={payment.pay_id}>
                    <td>{payment.pay_id}</td>
                    <td>{payment.cid}</td>
                    <td>{payment.cname}</td>
                    <td>{payment.vc_id}</td>
                    <td>{payment.total_pay}</td>
                    <td>{formattedDate}</td>
                    <td>{formattedTime}</td>
                    {/* <td className='d-flex justify-content-between'> */}
                      {/* <button className='btn btn-success'>read</button> */}
                      {/* <button className='btn'><PageviewOutlinedIcon/></button> */}
                      {/* <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={tableModalStyle}> */}
                            {/* <button className='btn' style={{ backgroundColor: 'rgb(21, 101, 192)', color: 'white', borderStyle: 'none' }}>
                              <a onClick={downloadQR}> Download QR </a>
                            </button> */}
                            {

                            }
                          {/* </Box>
                        </Modal> */}
                      {/* <button className='btn'><DeleteIcon/></button> */}
                    {/* </td> */}
                  </tr>
                );
              })}


            </tbody>
          </table>
        </div>
      </>
    </div>
    </div>
  )
}

export default Customers


