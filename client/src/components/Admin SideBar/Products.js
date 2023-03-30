import React, { useState, useEffect } from 'react'
import SideBar from './SideBar'
import './Products.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Axios from 'axios'


function Products() {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    width:400,
    height:400,
    justifyContent:'center',
    alignItems: 'center'
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [img, setImg] = useState(["https://media.s-bol.com/JQ7M9lvwww59/28285Zj/545x1200.jpg"])

  const [product, setProduct] = useState([])

  useEffect(() => {
    Axios.get('http://localhost:3002/api/get_product')
      .then(res => setProduct(res.data))
      .catch(err => console.log(err))
  }, []);

  const navigate = useNavigate();

  function handleDelete(pid) {
    console.log("Product id : " + pid)
    Axios.post('http://localhost:3002/api/deleteprod', { pid: pid })
      .then(res => {
        console.log(res.data);
        window.location.reload(false);
      })
      .catch(err => console.log(err));
  }

  function gotoadd() {
    navigate("/admin_products/add");
  }
  function gotoupdate(pid) {
    navigate(`/admin_products/update/${pid}`)
  }
  function handleImg(pimg){
    console.log(img);
    setImg(pimg);
    handleOpen();
  }
  // function handlePid () {
  //  e=>setPid(e.target.value)
  //   handleData()
  // }

  return (
    <div class="AdminProducts-container">
      <SideBar />
      <>
        <div className='p-3'>
          <div className='add_btn mt-2 p-2'>
            <button className='btn btn-primary mt-2' onClick={gotoadd}>Add Product</button>

          </div>
          <table class="table table-hover mt-2 table-bordered">
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
                product.map((data) => (
                  <tr key={data.pid}>
                    <td>{data.pid}</td>
                    <td>{data.pname}</td>
                    <td>{data.cat_id}</td>
                    <td>{data.price}</td>
                    <td>{data.pdesc}</td>
                    <td>{data.STOCKS}</td>
                    <td className='d-flex justify-content-between'>
                      {/* <button className='btn btn-success'>read</button> */}
                      <button className='btn' onClick={()=>{handleImg(data.pimg)}}><RemoveRedEyeOutlinedIcon /></button>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                        {
                        img && <img src="https://m.media-amazon.com/images/I/51DYRgt8QEL._SX522_.jpg" style={{ maxWidth: '100%', maxHeight: '100%' }} alt="Display Image" />}
                        </Box>
                      </Modal>
                      <button className='btn' onClick={() => gotoupdate(data.pid)}><EditIcon /></button>
                      <button className='btn' onClick={() => handleDelete(data.pid)}><DeleteIcon /></button>
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