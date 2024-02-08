import React, {useState, useEffect, useCallback} from 'react';
// import { useAuth } from '../context/auth';
import axios from 'axios';
import {Checkbox, Radio} from 'antd';
import { Prices } from '../components/Layout/Prices';
import {useNavigate} from 'react-router-dom';
import {useCart} from "../context/cart";
import {toast} from 'react-toastify';


const HomePage = () => {
  // const [auth] = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] =  useState(1);
  const [loading, setLoading] = useState();

  
  //get all categories
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
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);


  //get all products
  const getAllProducts = async() => {
    try {
      setLoading(true);
      const auth = JSON.parse(localStorage.getItem('auth'));
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`, 
        },
      };
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`, config,);
      setLoading(false);
      setProducts(data.products);
      
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };


  //getTotal
  const getTotal = async() => {
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`, 
        },
      };
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`, config,);
      if (data?.success) {
        setTotal(data?.total);
      }
    } catch (error) {
      console.log(error);
    }
  }

useEffect(() => {
  if (page === 1) return;
  loadMore();

},[page]);
  //load more
  const loadMore = async() => {
    try {
      setLoading(true)
      const auth = JSON.parse(localStorage.getItem('auth'));
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`, 
        },
      };
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`, config,);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }


  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked]
    if(value) {
      all.push(id)
    } else {
      all = all.filter(c => c !== id)
    }
    setChecked(all);
  };

//   useEffect(() => {
//     if(!checked.length || !radio.length) getAllProducts();
//   }, [checked.length, radio.length, filteredProduct]);

//   useEffect(() => {
//     if(checked.length || radio.length) filteredProduct();
// }, [checked, radio, filteredProduct]);

  
  //get filtered product
  const filteredProduct = useCallback(async() => {
    try {
      const auth = JSON.parse(localStorage.getItem('auth'));
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`, 
        },
      };

      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/filter-product`,{checked, radio}, config,);
      setProducts(data?.products)

    } catch (error) {
      console.log(error);
    }
  }, [checked, radio]);


  useEffect(() => {
    if(!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length, filteredProduct]);

  useEffect(() => {
    if(checked.length || radio.length) filteredProduct();
}, [checked, radio, filteredProduct]);



  return (
    <div>
       <div className="row mt-3">
        <div className="col-md-2">
        <h4 className='text-center'>Filter By Category</h4>
        <div className="d-flex flex-column">
        {categories?.map((c) => (
          <Checkbox key={c.id} onChange={(e) => handleFilter(e.target.checked, c.id)}>
            {c.name}
          </Checkbox>
        ))}
        </div>

        <h4 className='text-center mt-4'>Filter By Price</h4>
        <div className="d-flex flex-column">
        <Radio.Group onChange={e => setRadio(e.target.value)}>
          {Prices?.map(p => (
            <div key={p.id}>
            <Radio value={p.array}>{p.name}</Radio>
            </div>
            
          ))}
        </Radio.Group>
        </div>

        <div className="d-flex flex-column">
        <button className='btn btn-danger' 
        onClick={() => window.location.reload()}>
        RESET FILTERS
        </button>
        </div>


        </div>
          <div className="col-md-9">
          {/* {JSON.stringify(radio, null, 4)} */}
            <h1 className='text-center'>All Products</h1>
            <div className="d-flex flex-wrap">

            {products?.map(p => (

          <div className="card m-2" style={{width: "18rem"}}>
            <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p.id}`} alt={p.name}/>
            <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description}</p>
                <p className="card-text">₹{p.price}</p>

                <button 
                className='btn btn-primary ms-1' 
                onClick={() => navigate(`/product/${p.slug}`)}>
                More Details
                </button>

                <button 
                className='btn btn-secondary ms-1' 
                onClick={() => {
                  setCart((prevCart) => {
                    const newCart =  [...prevCart, { ...p, price: parseFloat(p.price) }];
                    localStorage.setItem('cart', JSON.stringify(newCart));
                    return newCart;
                  });
                  toast.success('Item added to cart');
                }}
              >
                Add to Cart
              </button>

            </div>
            </div>
            
        ))}
            {/* <h1>Products</h1> */}
          </div>
          <div className='m-2 p-3'>
            {products && products.length < total && (
              <button className='btn btn-warning'
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}>
                {loading ? 'Loading...' : 'Loadmore'}
              </button>
            )}
          </div>
        </div>
       </div>
    </div>
  )
}

export default HomePage;

