import React, {useState, useEffect} from 'react';
import { useSearch } from '../../context/search';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { FaSearch } from "react-icons/fa";



const SearchInput = () => {

    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    const [placeholder, setPlaceholder] = useState('');
    const placeholderOptions = ['nike', 'titan', 'bag'];
    const [index, setIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
          setIndex((prevIndex) => (prevIndex + 1) % placeholderOptions.length);
      }, 2000);

      return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPlaceholder(placeholderOptions[index]);
}, [index]);


    const handleSubmit =  async (e) => {
        e.preventDefault();
        try {
            const auth = JSON.parse(localStorage.getItem('auth'));
            const config = {
              headers: {
                Authorization: `Bearer ${auth.token}`, 
              },
            };
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`, config,);
            setValues({...values, result: data});
            navigate('/search');
        } catch (error) {
            console.log(error);
        }
    }
  return (
    



    <div>
    
        <form className='d-flex' role='search' onSubmit ={handleSubmit}>
            <input
            style={{height: '40px', fontSize: '12px', borderRadius: '20px'}}
            className='form-control me-2'
            type='search'
            placeholder={`Search for ${placeholder}`}
            aria-label='Search'
            value={values.keyword}
            onChange={(e) => {
                setValues({...values, keyword: e.target.value})
            }}
            onFocus={() => setPlaceholder(placeholderOptions[index])}
            onBlur={() => setPlaceholder('')}
            />
            {/* <button className='btn btn-outline-success' type='submit'>
            <FaSearch />
            </button> */}

            <FaSearch
            className='btn btn-outline-success'
            style={{ cursor: 'pointer', fontSize: '40px', border: 'none'  }}
            onClick={handleSubmit} />

                 
                   
                    
                
        </form>
    </div>

    
    
  );
};



export default SearchInput;