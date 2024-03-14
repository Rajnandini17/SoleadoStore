import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .main-content {
    width: 100%;
    max-width: 600px; /* Adjust the max-width as needed */
    background-color: #fff;
    border-radius: 8px;
    padding: 20px 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .header {
    text-align: center;
  }

  form {
    margin-top: 20px;
  }

  .input-fields {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 20px;

    .input {
      display: flex;
      align-items: center;

      .img-icon {
        margin-right: 10px;
      }

      input {
        flex: 1;
        height: 45px;
        font-size: 16px;
      }
    }
  }

  .button-class {
    margin-top: 20px;
  }
`;

const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();

  // state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // get user data
  useEffect(() => {
    const { email, name, phone, address } = auth?.user || {};
    setName(name || '');
    setPhone(phone || '');
    setAddress(address || '');
    setEmail(email || '');
  }, [auth?.user]);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        {
          name,
          email,
          password,
          phone,
          address,
        },
        config
      );

      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem('auth');
        if (ls) {
          ls = JSON.parse(ls);
          ls.user = data.updatedUser;
          localStorage.setItem('auth', JSON.stringify(ls));
          toast.success('Profile Updated Successfully!');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Wrapper>
      <div className='main-content'>
        <div className='header'>
          <form onSubmit={handleOnSubmit}>
            <h3 style={{fontSize: '26px', fontWeight: '600', paddingBottom: '15px'}}>Edit details</h3>

            <div className='input-fields'>
              <div className='input'>
                <FaUser className='img-icon' />
                <input
                  type='text'
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className='form-control'
                  placeholder='Enter your Name'
                />
              </div>

              <div className='input'>
                <FaEnvelope className='img-icon' />
                <input
                  type='email'
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className='form-control'
                  placeholder='Enter your Email'
                  disabled
                />
              </div>

              <div className='input'>
                <FaLock className='img-icon' />
                <input
                  type='password'
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className='form-control'
                  placeholder='Enter your Password'
                />
              </div>

              <div className='input'>
                <FaPhone className='img-icon' />
                <input
                  type='text'
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className='form-control'
                  placeholder='Enter your Phone'
                />
              </div>

              <div className='input'>
                <FaMapMarkerAlt className='img-icon' />
                <input
                  type='text'
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  className='form-control'
                  placeholder='Enter Address'
                />
              </div>

              <div className='button-class'>
                <button type='submit' className='btn btn-primary'>
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Profile;
