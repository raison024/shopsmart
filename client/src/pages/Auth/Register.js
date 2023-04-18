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
  const [dob,setDOB] = useState("");
  const [gender,setGender] = useState("");

  const navigate = useNavigate();

  const submitPost = (e) => {
    e.preventDefault();
    
    const data = { userName: userName ,email: email, password: password, gender: gender, dob: dob, mobile: mobile };
    
    Axios.post('http://localhost:3002/api/createuser', data)
        .then((response) => {
        if (response.data.success) {
            navigate("/login");
            alert(`${email} Registered Successfully :)`)

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
        
          <TextField id="Auth-input0" label="Customer Name" required
            variant="outlined" fullWidth margin='normal' size='small' 
            type='text' onChange={(e) => { setUserName(e.target.value) }} />
          
          <div class="btn-group">
            <input type="radio" class="btn-check" name="options" id="option1" value="male" checked={setGender === 'male'} onChange={(e) => { setGender(e.target.value) }} />
            <label class="btn btn-secondary" for="option1">Male</label>

            <input type="radio" class="btn-check" name="options" id="option2" value="female" checked={setGender === 'female'} onChange={(e) => { setGender(e.target.value) }} />
            <label class="btn btn-secondary" for="option2">Female</label>

            <input type="radio" class="btn-check" name="options" id="option3" value="other" checked={setGender === 'other'} onChange={(e) => { setGender(e.target.value) }} />
            <label class="btn btn-secondary" for="option3">Other</label>
          </div>
          <br />

          <TextField id="date" required className='dob' label="Birthday" type="date" defaultValue="2001-06-20" InputLabelProps={{ shrink: true,}} onChange={(e) => { setDOB(e.target.value) }}/>
        
          <TextField id="Auth-input" label="Email" required
            variant="outlined" fullWidth margin='normal' size='small' 
            type='email' onChange={(e)=> {setEmail(e.target.value)}} />
        
          <TextField id="Auth-input2" label="Password" required
            variant="outlined" fullWidth margin='normal' size='small' 
            type='password' onChange={(e)=> {setPassword(e.target.value)}} />
        
          <TextField id="Auth-input3" label="Mobile Number" required
            variant="outlined" fullWidth margin='normal' size='small' 
            type="tel" onChange={(e)=> {setMobileNo(e.target.value)}} />

          <Button variant='contained' 
            style={{textTransform:'none', marginBlock: '15px'}} 
            fullWidth type='submit'>Proceed</Button>
        
          <p>Already a user?&nbsp;
          <Link to="/login" style={{width: '100%', margin: '0', textDecoration: 'none'}}> 
          Sign in 
            {/* <Button variant='contained' color='success' style={{ textTransform: 'none', marginTop: '20px' }} fullWidth>Sign In</Button> */}
          </Link>
          </p>
          
          

        </form>
      </div>
)}

export default Register