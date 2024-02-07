import React, {useState, useEffect} from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import {toast} from 'react-toastify';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);

    //getAll products
    const getAllProducts = async () => {
        try {
            const auth = JSON.parse(localStorage.getItem('auth'));

      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`, 
        },
      };

            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`, config);
            setProducts(data.products);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong.');
        }
    };

    useEffect(()=> {
        getAllProducts();
    }, []);


  return (
    <div>
        <AdminMenu />
        <div className='main-content'>
    <div className="container">
    </div>
       <div className="col-md-9">
        <h1 className='text-center'>All Products List</h1> 
        <div className="d-flex flex-wrap">
        {products?.map(p => (
          <Link key = {p.id} to = {`/dashboard/admin/product/${p.slug}`} 
          style={{textDecoration: 'none', color: 'black !important'}}>

          <div className="card m-2" style={{width: "18rem"}}>
            <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p.id}`} alt={p.name}/>
            <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description}</p>
            </div>
            </div>

          </Link>
        
            
            
        ))}
        
        </div>
       </div>
    </div>
    </div>
  )
}

export default Products

