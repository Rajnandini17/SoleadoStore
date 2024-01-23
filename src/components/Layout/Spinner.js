import React, { useState, useEffect } from 'react';
import loading from '../Layout/loading.gif';
import { useNavigate } from 'react-router-dom';
import '../../styles/Spinner.css';

const Spinner = () => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();

    useEffect(() => {
      const interval = setInterval(() => {
        setCount((prevValue) => {
          if (prevValue === 1) {
            clearInterval(interval);
            navigate('/login');
          }
          return prevValue - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }, [navigate]);

    return (
      <div className='text-center'>
        <h3>Redirecting in {count} seconds</h3>
        <img className='spin' src={loading} alt='loading' />
      </div>
    );
}

export default Spinner;
