import React, {useState} from 'react';
import { TextField, Button } from '@mui/material'
import './Auth.css'
import { Link } from 'react-router-dom'
import Axios from 'axios'

function Register() {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const submitPost = () => {
Axios.post('http://localhost:3002/api/createuser', {email: email, password:password})
}

  return (
    <div className='Auth-header Auth-column'>
        <Link to="/" className='Auth-goback'>&larr; &nbsp;Go back</Link>
        <form className='Auth-container Auth-column' style={{alignItems: 'flex-start'}} onSubmit={submitPost}>
            <h2>Sign Up</h2>
            <p>Enter your details</p>
            <TextField id="Auth-input" label="Email" 
              variant="outlined" fullWidth margin='normal' size='small' 
              type='email' onChange={(e)=> {setEmail(e.target.value)}} />
            <TextField id="Auth-input2" label="Password" 
              variant="outlined" fullWidth margin='normal' size='small' 
              type='password' onChange={(e)=> {setPassword(e.target.value)}} />
            <Button variant='contained' 
              style={{textTransform:'none', marginBlock: '15px'}} 
              fullWidth type='submit'>Proceed</Button>
            <h4>Already a user?</h4>
            
            <Link to="/login" style={{width: '100%', margin: '0'}}>
            <Button variant='contained' color='success' style={{textTransform:'none', marginTop: '20px'}} fullWidth>Sign In</Button>
            </Link>
        </form>
    </div>
    
  )
}

export default Register