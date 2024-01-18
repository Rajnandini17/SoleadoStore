import React, {useState} from 'react';
import '../styles/Register.css';
import user_icon from '../images/user.png';
import email_icon from '../images/mail.png';
import password_icon from '../images/padlock.png';
import phone_icon from '../images/phone.png';
import location_icon from '../images/location.png';
import { toast } from 'react-toastify';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Register = () => {

    const [name, setName] =  useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    // const showToast = () => {
    //     toast.success("Registered successfully!");
    // };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try {

            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, 
            {name, email, password, phone, address}
            );
            if(res.data.success){
               toast.success(res.data.message);
               navigate('/login');
            } else {
                toast.error(res.data.message);
            }
            
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }

    };


  return (
    <div>
    <div className='form-container'>
    {/* <h1>New Registration</h1> */}

    <form onSubmit={handleOnSubmit}>
    <h1>Sign up</h1>

    <div class="form-group">
    <img className='img-icon' src={user_icon} alt='' />
    {/* <label for="inputName">Name</label> */}
    <input 
    type="text" 
    value={name}
    onChange={(event) => setName(event.target.value)}
    className="form-control" 
    id="inputName" 
    placeholder="Enter your Name"
    required
    />
    
    </div>

<div class="form-group">
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

<div class="form-group">
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

  <div class="form-group">
    <img className='img-icon' src={phone_icon} alt='' />
    {/* <label for="inputPhone">Phone</label> */}
    <input 
    type="text" 
    value={phone}
    onChange={(event) => setPhone(event.target.value)}
    className="form-control" 
    id="inputPhone"  
    placeholder="Enter your Phone"
    required
    />
    {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
  </div>

  <div class="form-group">
  <img className='img-icon' src={location_icon} alt='' />
    {/* <label for="inputAddress">Address</label> */}
    <input 
    type="text" 
    value={address}
    onChange={(event) => setAddress(event.target.value)}
    className="form-control" 
    id="inputAddress" 
    placeholder="Enter Address"
    required
    />
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </div>
    </div>
  )
}

export default Register