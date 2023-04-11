
import React, { useState, useEffect } from 'react'
import SideBar from '../../components/Admin SideBar/SideBar'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './Stores.css'
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Axios from 'axios'


function Customers() {

  const [payments, setPayments] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:3003/api/read_payments')
      .then(res => {
        console.log(res)
        setPayments(res.data)
      })
      .catch(err => console.log(err))
    console.log("Testing: " + payments)
  }, []);

  // function handleDelete(cid) {
  //   console.log("Customer id : " + cid)
  //   Axios.post('http://localhost:3002/api/delete_customers', { cid: cid })
  //     .then(res => {
  //       console.log(res.data);
  //       window.location.reload(false);
  //     })
  //     .catch(err => console.log(err));
  // }

  return (
    <div className='Admin'>
      <SideBar />
    

    <div class="AdminStores-container">
      <>
        <div className='Customers-right mt-4'>

          <table className="table table-hover mt-3 table-bordered ">
            <thead>
              <tr className='table-dark'>
                <th scope="col">Payment ID</th>
                <th scope="col">Customer ID</th>
                <th scope="col">Virtual Cart ID</th>
                <th scope="col">Total Payment</th>
                <th scope="col">Payment Date</th>
                <th scope="col">Payment Time</th>
                <th scope="col">Actions</th>
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
                    <td>{payment.vc_id}</td>
                    <td>{payment.total_pay}</td>
                    <td>{formattedDate}</td>
                    <td>{formattedTime}</td>
                    <td className='d-flex justify-content-between'>
                      {/* <button className='btn btn-success'>read</button> */}
                      <button className='btn'><PageviewOutlinedIcon/></button>
                      <button className='btn'><DeleteIcon/></button>
                    </td>
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


