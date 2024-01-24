import React, {useState} from 'react';
import '../styles/ForgotPassword.css';
import email_icon from '../images/mail.png';
import question_icon from '../images/question.png';
import password_icon from '../images/padlock.png';
import { toast } from 'react-toastify';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
// import { useAuth } from '../context/auth';

const Login = () => {

    
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [question, setQuestion] = useState("");
    const navigate = useNavigate();

    // const showToast = () => {
    //     toast.success("Registered successfully!");
    // };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try {

            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, 
            {email, newPassword, question,
            });
            if(res && res.status===200 && res.data.success){
                // console.log(res.data);
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
    <div className='form-container'>
    <div className='header'>
    {/* <h1>New Registration</h1> */}

    <form onSubmit={handleOnSubmit}>
    <h1>Forgot password?</h1>
    <h4>Reset</h4>

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
    <img className='img-icon' src={question_icon} alt='' />
    {/* <label for="inputEmail">Email</label> */}
    <input 
    type="text" 
    value={question}
    onChange={(event) => setQuestion(event.target.value)}
    className="form-control" 
    id="inputQuestion" 
    placeholder="Enter your nickname"
    required
    />
    </div>

<div class="input">
    <img className='img-icon' src={password_icon} alt='' />
    {/* <label for="inputPassword">Password</label> */}
    <input 
    type="password" 
    value={newPassword}
    onChange={(event) => setNewPassword(event.target.value)}
    className="form-control" 
    id="inputPassword" 
    placeholder="Enter new Password"
    required
    />
    </div>
    <div className='button-class'>
  <button type="submit" class="btn btn-primary">Reset</button>
  
  </div>
  </div>
</form>
    </div>
    </div>
  )
}

export default Login