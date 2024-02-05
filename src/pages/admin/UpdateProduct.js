import React, {useState, useEffect} from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import {toast} from 'react-toastify';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import {Select} from 'antd';
const {Option} = Select;


const UpdateProduct = () => {
  const navigate = useNavigate();
//   const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState('');
  const { slug } = useParams();
  console.log('Current Slug:', slug);

  //get single product
  const getSingleProduct = async () => {
    try {
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${slug}`);
        console.log('API Response:', data);
    

        if(data && data.products) {
            const productData = data.products;
      setName(productData.name);
      setDescription(productData.description);
      setPrice(productData.price);
      setQuantity(productData.quantity);
      setShipping(productData.shipping);
      setCategory(productData.categoryId);
    } else {
      console.log('Product not found in API response');
      console.log('API Response:', data);
    }
  } catch (error) {
    console.log('Error fetching product:', error);
  }
                
};

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, [])


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
    <div>
    <AdminMenu />
    <div className='main-content'>
    <div className='container'>
        <h1>Update Product</h1>
        <div className='m-1 w-75'>
          <Select bordered={false} placeholder="Select a category"
          size='large' showSearch className='form-select mb-3'
          onChange={(value) => {setCategory(value)}}>
          {categories?.map(c => (
            <Option key = {c.id} value = {c.id}>{c.name}</Option>
          ))}

          </Select>
          <div className='mb-3'>
            <label className='btn btn-outline-secondary'>
            {photo ? photo.name : "Upload Photo"} 
              <input type='file' name='photo' accept='image/*' onChange={(event) => setPhoto(event.target.files[0])} hidden/>
            </label>
          </div>
          <div className='mb-3'>
            {photo && (
              <div className='text-center'>
                <img src={URL.createObjectURL(photo)} alt='product' height={'200px'}
                className='img img-responsive'/>
              </div>
            )}
          </div>

          <div className="mb-3">
            <input type='text' 
            value={name} 
            placeholder='write a name'
            className='form-control' 
            onChange={(event) => setName(event.target.value)} 
            />
          </div>

          <div className="mb-3">
            <textarea type='text' 
            value={description} 
            placeholder='give description'
            className='form-control' 
            onChange={(event) => setDescription(event.target.value)}              
            />
          </div>

          <div className="mb-3">
            <input type='number' 
            value={price} 
            placeholder='write a price'
            className='form-control' 
            onChange={(event) => setPrice(event.target.value)}  
            />
          </div>

          <div className="mb-3">
            <input type='number' 
            value={quantity} 
            placeholder='write a quantity'
            className='form-control' 
            onChange={(event) => setQuantity(event.target.value)} 
            />
          </div>

          <div className="mb-3">
            <Select
            bordered={false} 
            placeholder='Select Shipping'
            size='large'
            showSearch
            className='form-select mb-3' 
            onChange={(value) => {setShipping(value);
            }}
            >
              <Option value='0'>No</Option>
              <Option value='1'>Yes</Option>
            </Select> 
          </div>
          <div className='mb-3'>
            <button className='btn btn-primary' onClick={handleCreate}>
              UPDATE PRODUCT
            </button>
          </div>

        </div>
    </div>
   </div>
    </div>
  )
        };

export default UpdateProduct;