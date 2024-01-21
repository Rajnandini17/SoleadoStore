import React, {useState} from 'react';
import '../styles/Login.css';
import email_icon from '../images/mail.png';
import password_icon from '../images/padlock.png';
import { toast } from 'react-toastify';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Login = () => {

    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // const showToast = () => {
    //     toast.success("Registered successfully!");
    // };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try {

            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, 
            {email, password}
            );
            if(res && res.status===200 && res.data.success){
                console.log(res.data);
               toast.success(res.data.message);
               navigate('/');
            } else {
                console.log(res.data.error);
                toast.error(res.data.message || "Invalid Credentials");
            }
            
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }

    };


  return (
    <div className='form-container'>
    <div className='header'>
    {/* <h1>New Registration</h1> */}

    <form onSubmit={handleOnSubmit}>
    <h1>Welcome Back</h1>
    <h4>Login</h4>

<div className='input-fields'>

<div class="input">
    <img className='img-icon' src={email_icon} alt='' />
    {/* <label for="inputEmail">Email</label> */}
    <input 
    type="email" 
    value={email}
    onChange={(event) => setEmail(event.target.value)}
    className="form-control" 
    id="inputEmail" 
    placeholder="Enter your Email"
    required
    />
    </div>

<div class="input">
    <img className='img-icon' src={password_icon} alt='' />
    {/* <label for="inputPassword">Password</label> */}
    <input 
    type="password" 
    value={password}
    onChange={(event) => setPassword(event.target.value)}
    className="form-control" 
    id="inputPassword" 
    placeholder="Enter your Password"
    required
    />
    </div>

  <button type="submit" class="btn btn-primary">Login</button>
  </div>
</form>
    </div>
    </div>
  )
}

export default Login