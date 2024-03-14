import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  h1 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .card {
    width: 100%;
    height: 26rem;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 20rem;
      object-fit: cover;
    }

    .details {
      padding: 10px;
      font-size: 12px;
      font-weight: bold;
      text-align: center;
    }
  }
`;


const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] =  useState(1);
    const [total, setTotal] = useState(0);
    const [categories, setCategories] = useState([]);


    useEffect(() => {
      getAllCategory();
      getTotal();
    }, []);
  
    useEffect(() => {
      if (page === 1) return;
      loadMore();
    }, [page]);


    //get all categories
  const getAllCategory = async() => {
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`,);
  
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };


    //get all products
  const getAllProducts = async() => {
    try {
      setLoading(true);
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`, );
      setLoading(false);
      setProducts(data.products);
      
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

    useEffect(()=> {
        getAllProducts();
    }, []);



     //getTotal
  const getTotal = async() => {
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`, );
      if (data?.success) {
        setTotal(data?.total);
      }
    } catch (error) {
      console.log(error);
    }
  }


    const loadMore = async() => {
      try {
        setLoading(true)
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`,);
        setLoading(false);
        setProducts([...products, ...data?.products]);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }


  return (
  
  <Wrapper>
      <div>
        <h1>All Products List</h1>
        <div className="grid">
          {products?.map((p) => (
            <div key={p.id} className="card">
              <Link to={`/dashboard/admin/product/${p.slug}`}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p.id}`}
                  alt={p.name}
                />
              </Link>
              <div className="details">
                <div>{p.name}</div>
                <div>₹{p.price}</div>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-3'>
        {products && products.length < total && (
          <button className='btn btn-warning'
          style={{marginTop: '30px'}}
          onClick={(e) => {
            e.preventDefault();
            setPage(page + 1);
            
          }}>
            {loading ? 'Loading...' : 'Loadmore'}
          </button>
        )}
      </div>

      </div>
    </Wrapper>





  )
}

export default Products

