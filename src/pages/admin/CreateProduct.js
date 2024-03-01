import React, {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import {Select} from 'antd';
const {Option} = Select;



const Wrapper = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .form-container {
    margin: 10px auto;
    max-width: 400px;
  }

  .mb-3 {
    margin-bottom: 15px;
  }

  .form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-bottom: 15px;
    font-size: 16px;
  }

  .btn-primary {
    background-color: #0a1435;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }

  .form-select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-bottom: 15px;
    font-size: 16px;
  }

  .img-responsive {
    width: 100%;
    height: auto;
  }
`;


const CreateProduct = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState('');

  //get all Category
  const getAllCategory = async() => {
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));

      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`, 
        },
      };

      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`, config,);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error while getting category');
      
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));

      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`, 
        },
      };

      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const product = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`,productData, config);
      console.log('Received data');
      if(product.data.success) {
        toast.success('Product created Successfully');
        navigate('/dashboard/admin/products');
      } else {
        toast.error(product.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };



  return (
    <Wrapper>
    <div>
      <h1>Create Product</h1>
      <div className='form-container'>
        <select
          className='form-select mb-3'
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value=''>Select a category</option>
          {categories?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <div className='mb-3'>
          <label htmlFor='photo' className='btn-primary'>
            {photo ? photo.name : 'Upload Photo'}
          </label>
          <input
            type='file'
            id='photo'
            name='photo'
            accept='image/*'
            style={{ display: 'none' }}
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>

        {photo && (
          <div className='mb-3'>
            <img
              src={URL.createObjectURL(photo)}
              alt='product'
              className='img-responsive'
            />
          </div>
        )}

        <input
          type='text'
          value={name}
          placeholder='Product Name'
          className='form-control mb-3'
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          value={description}
          placeholder='Product Description'
          className='form-control mb-3'
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type='number'
          value={price}
          placeholder='Price'
          className='form-control mb-3'
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type='number'
          value={quantity}
          placeholder='Quantity'
          className='form-control mb-3'
          onChange={(e) => setQuantity(e.target.value)}
        />

        <select
          className='form-select mb-3'
          onChange={(e) => setShipping(e.target.value)}
        >
          <option value=''>Select Shipping</option>
          <option value='0'>No</option>
          <option value='1'>Yes</option>
        </select>

        <button className='btn-primary' onClick={handleCreate}>
          CREATE PRODUCT
        </button>
      </div>
    </div>
  </Wrapper>




  );
};

export default CreateProduct;