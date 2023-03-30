import React, { useState, useEffect } from 'react'
import SideBar from './SideBar'
// import './AddProduct.css'
import { useNavigate,useParams} from 'react-router-dom'
import Axios from 'axios'


function UpdateProduct() {

  const {pid} = useParams();
  const [product,setProduct] = useState({pname:'hello',cat_name:'jkbbnk',price:0,stocks:0,pimg:'jnjnkj',pdesc:''})

  //Getting the existing details from the backend
  useEffect(()=>{
    Axios.get(`http://localhost:3002/api/read_update_product/${pid}`)
    .then(res=>{setProduct(res.data )
        // console.log(product)
    })
    .catch(err => console.log(err))
  })

  //  const navigate = useNavigate();

   const handleChange = e => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    Axios.put(`/api/submit_update_product/${pid}`, product)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (

    <div class="AdminProducts-AddProduct-container">
      <SideBar />
      <div className='container'>
        {/* <NavLink to='/admin_products'>Hey</NavLink> */}
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="name">Product Name</label>
              <input type="text" class="form-control" placeholder="Enter product name" name='pname'  value={product.pname} onChange={handleChange}/>

              {/* <small class="form-text text-muted">We'll never share your email with anyone else.</small> */}
            </div>

            {/* Input Image
            <div className='inputImage'>
              <input type="file" multiple accept='image/*' onChange={onImageChange}/>
            </div> */}

            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="name">Category</label>
              <input type="text" class="form-control" placeholder="Enter the category of the product" name='cat_name'  value={product.cat_name} onChange={handleChange}/>
            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="name">Price</label>
              <input type="number" class="form-control" placeholder="Enter the price of the product" name='price'   value={product.price} onChange={handleChange}/>
            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="name">Stocks</label>
              <input type="number" class="form-control" placeholder="Enter the stocks of the product" name='stocks'   value={product.stocks} onChange={handleChange}/>
            </div>
            <div class="mb-3 col-lg-6 col-md-6 col-12">
              <label htmlFor="name ">Product Image Link</label>
              <input type="text" class="form-control" placeholder="Enter the image link" name='pimg'  value={product.pimg} onChange={handleChange}/>
            </div>
            <div className='mb-3 col-lg-12 col-md-12 col-12'>
              <label> Product Description </label>
              <br />
              <textarea name="pdesc" id="" cols="70" rows="5"  value={product.pdesc} onChange={handleChange}></textarea>
            </div>
            <div className='mb-3 col-lg-6 col-md-12 col-12'>
             <button type="submit" class="btn btn-primary mt-4">Submit</button>
            </div>
            </div>
        </form>
        {/* <p>{product}</p> */}
      </div>
      {/* <h1>{submitStatus}</h1> */}
    </div>
  )
}

export default UpdateProduct