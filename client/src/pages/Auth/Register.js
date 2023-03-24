import React, {useState} from 'react';
import { TextField, Button } from '@mui/material'
import './Auth.css'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'

function Register() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [userName,setUserName] = useState("");
  const [mobile,setMobileNo] = useState("");

  const navigate = useNavigate();

  const submitPost = (e) => {
    e.preventDefault();
    
    const data = { userName: userName ,email: email, password: password, mobile: mobile };
    
    Axios.post('http://localhost:3002/api/createuser', data)
        .then((response) => {
        if (response.data.success) {
            navigate("/login");
        }})
        .catch((error) => {
        console.log(error);
        });

  }

    return (
      <div className='Auth-header Auth-column'>
          
        <Link to="/" className='Auth-goback'>&larr; &nbsp;Go back</Link>
        
        <form method="POST" className='Auth-container Auth-column' style={{ alignItems: 'flex-start' }} onSubmit={submitPost}>
        
          <h2>Sign Up</h2>
          <p>Enter your details</p>
        
          <TextField id="Auth-input0" label="Customer Name" 
            variant="outlined" fullWidth margin='normal' size='small' 
            type='text' onChange={(e) => { setUserName(e.target.value) }} />
          
          <div class="btn-group">
            <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" />
            <label class="btn btn-secondary" for="option1">Male</label>

            <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off" />
            <label class="btn btn-secondary" for="option2">Female</label>

            <input type="radio" class="btn-check" name="options" id="option3" autocomplete="off" />
            <label class="btn btn-secondary" for="option3">Other</label>
          </div>

          <TextField id="date" label="Birthday" type="date" defaultValue="2023-03-18" InputLabelProps={{ shrink: true,}}/>
        
          <TextField id="Auth-input" label="Email" 
            variant="outlined" fullWidth margin='normal' size='small' 
            type='email' onChange={(e)=> {setEmail(e.target.value)}} />
        
          <TextField id="Auth-input2" label="Password" 
            variant="outlined" fullWidth margin='normal' size='small' 
            type='password' onChange={(e)=> {setPassword(e.target.value)}} />
        
          <TextField id="Auth-input3" label="Mobile Number" 
            variant="outlined" fullWidth margin='normal' size='small' 
            type="tel" onChange={(e)=> {setMobileNo(e.target.value)}} />
        
          {/* <TextField id="Auth-input4" label="Gender" 
            variant="outlined" fullWidth margin='normal' size='small' 
            type='text' onChange={(e)=> {setPassword(e.target.value)}} />
         */}
          {/* <TextField id="Auth-input5" label="Password" 
            variant="outlined" fullWidth margin='normal' size='small' 
            type='password' onChange={(e)=> {setPassword(e.target.value)}} />
         */}
          <Button variant='contained' 
            style={{textTransform:'none', marginBlock: '15px'}} 
            fullWidth type='submit'>Proceed</Button>
        
          <h4>Already a user?</h4>
          
          <Link to="/login" style={{width: '100%', margin: '0'}}>  
            <Button variant='contained' color='success' style={{ textTransform: 'none', marginTop: '20px' }} fullWidth>Sign In</Button>
          </Link>

        </form>
      </div>
)}

export default Register