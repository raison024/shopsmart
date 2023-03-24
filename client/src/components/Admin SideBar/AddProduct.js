import React, { useState, useEffect } from 'react'
import SideBar from './SideBar'
import './AddProduct.css'
import { NavLink } from 'react-router-dom'
import { useNavigate} from 'react-router-dom'
import Axios from 'axios'


// export  function UploadImages() {
//   const [images, setImages] = useState([]);
//   function onImageChange(e) {
//     setImages([...e.target.files]);
//   }
// } 

function AddProduct() {
  
  const [inpval,setINP]= useState({
    pname:"",
    cat_name:"",
    price:0,
    pstock:0,
    pdesc:"",
    pimg:"empty"
  })
  const setData = (e)=>{
      // console.log(e.target.value)
      const {name,value}=e.target;
      setINP((preval)=>{
         console.log(inpval)
          return{
            ...preval,
            [name]:value
          }
      })

   }

   const navigate = useNavigate();

   const [submitStatus, setsubmitStatus] = useState("");

   //Sending data to the backend 
   const submit = () => {
    Axios.post('http://localhost:3002/api/add_product',inpval)
    .then((response) => {
      
      if(response.data.message) {
        setsubmitStatus(response.data.message)
      } else {
        navigate("/admin_home");
      }
    
      console.log(response);
    })
    }

  return (

    <div class="AdminProducts-AddProduct-container">
      <SideBar />
      <div className='container'>
        <NavLink to='/admin_products'>Hey</NavLink>
        <form>
          <div className="row">
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label for="exampleInputEmail1">Product Name</label>
              <input type="text" class="form-control" placeholder="Enter product name" name='pname' onChange={setData} value={inpval.pname}/>

              {/* <small class="form-text text-muted">We'll never share your email with anyone else.</small> */}
            </div>

            {/* Input Image
            <div className='inputImage'>
              <input type="file" multiple accept='image/*' onChange={onImageChange}/>
            </div> */}

            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label>Category</label>
              <input type="text" class="form-control" placeholder="Enter the category of the product" name='cat_name' onChange={setData} value={inpval.cat_name} />
            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label>Price</label>
              <input type="number" class="form-control" placeholder="Enter the price of the product" name='price'  onChange={setData} value={inpval.price}/>
            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label>Stocks</label>
              <input type="number" class="form-control" placeholder="Enter the stocks of the product" name='pstock'  onChange={setData} value={inpval.pstock}/>
            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label>Product Image Link</label>
              <input type="text" class="form-control" placeholder="Enter the image link" name='pimg' onChange={setData} value={inpval.pimg} />
            </div>
            <div className='mb-3 col-lg-12 col-md-12 col-12'>
              <label> Product Description </label>
              <br />
              <textarea name="pdesc" id="" cols="70" rows="5"  onChange={setData} value={inpval.pdesc}></textarea>
            </div>
            <div className='mb-3 col-lg-6 col-md-12 col-12'>
             <button type="submit" class="btn btn-primary mt-4" onClick={submit}>Submit</button>
            </div>
            </div>
        </form>
      </div>
      <h1>{submitStatus}</h1>
    </div>
  )
}

export default AddProduct