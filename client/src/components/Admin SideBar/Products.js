import React, { useState, useEffect } from 'react'
import SideBar from './SideBar'
import './Products.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios'


function Products() {

  const [pid, setPid] = useState('');
  const[product,setProduct] = useState([])

  useEffect(() => {
     Axios.get('http://localhost:3002/api/get_product')
    .then(res=>setProduct(res.data))
    .catch(err=>console.log(err))
  }, []);

  const navigate = useNavigate();

  function handleDelete(pid){
    console.log("Product id : " + pid)
    Axios.post('http://localhost:3002/api/deleteprod', {pid: pid})
    .then(res=>{
      console.log(res.data);
      window.location.reload(false);
    })
    .catch(err=>console.log(err));
  }

  function gotoadd() {
    navigate("/admin_products/add");
  }

  // function handlePid () {
  //  e=>setPid(e.target.value)
  //   handleData()
  // }

  return (
    <div class="AdminProducts-container">
      <SideBar />
      <>
         <div>
         <div className='add_btn mt-2'>
         <button className='btn btn-primary mt-2' onClick={gotoadd}>Add Product</button>
         
        </div>
        <table class="table table-hover">
          <thead>
            <tr className='table-dark'>
              <th scope="col">Product ID</th>
              <th scope="col">Product Name</th>
              <th scope="col">Category ID</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
              <th scope="col">Stocks</th>
              <th scope="col">Actions</th>

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
            {
              product.map((data)=>(
                <tr key={data.pid}>
                   <td>{data.pid}</td>
                   <td>{data.pname}</td>
                   <td>{data.cat_id}</td>
                   <td>{data.price}</td>    
                   <td>{data.pdesc}</td>
                   <td>{data.STOCKS}</td>
                   <td className='d-flex justify-content-between'>
                <button className='btn btn-success'>read</button>
                <button className='btn btn-primary'>update</button>
                <button className='btn btn-danger' onClick={() => handleDelete(data.pid)}>delete</button>
              </td>
                </tr>
              ))
            }
          </tbody>
        </table>
         </div>

      </>
    </div>
  )
}

export default Products

// import * as React from 'react';



// export default function DataTable() {
//   return (

//   );
// }