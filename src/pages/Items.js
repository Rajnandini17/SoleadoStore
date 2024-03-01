import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
// import {Checkbox, Radio} from 'antd';
import { Prices } from '../components/Layout/Prices';
import {Link} from 'react-router-dom';
import {useCart} from "../context/cart";
import {toast} from 'react-toastify';
import FilterBar from '../components/Layout/FilterBar';




const Items = () => {
  
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] =  useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  
  // //get all categories
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

  // useEffect(() => {
  //   getAllCategory();
  //   getTotal();
  // }, []);


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

// useEffect(() => {
//   if (page === 1) return;
//   loadMore();

// },[page]);

  //load more
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


  
  //get filtered product
  const filteredProduct = useCallback(async() => {
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/filter-product`,{checked, radio}, );
      setProducts(data?.products)

    } catch (error) {
      console.log(error);
    }
  }, [checked, radio]);


  const resetFilters = () => {
    setChecked([]);
    setRadio([]);
  };


  useEffect(() => {
    if(!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length, filteredProduct]);

  useEffect(() => {
    if(checked.length || radio.length) filteredProduct();
}, [checked, radio, filteredProduct]);



  return (

    <div className='container'> 
    <div className='row mt-3' >
    <div className='col-md-3'>
      <FilterBar
            categories={categories}
            handleFilter={handleFilter}
            setRadio={setRadio}
            resetFilters={resetFilters} />
    </div>
      
      <div className='col-md-9'>
        <h3 className='text-center' style={{padding: '8px', fontWeight: 'bold'}}>{products.length} products</h3>
        <div className="grid grid-three-column">

  {products?.map(p => (

      <div className="card" key={p.id} style={{width: '18rem', height: '26rem'}}>
      <Link to={`/product/${p.slug}`}>
      <img className="card-img-top" 
      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p.id}`} 
      alt={p.name}
      style={{width: '18rem', height: '20rem'}}
      />
      </Link>

      <div style={{textAlign: 'center', fontSize: '15px', fontWeight: 'bold', paddingTop: '5px'}}>{p.name}</div>
<div className='grid grid-two-column' style={{fontSize: '12px', fontWeight: 'bold', padding: '5px'}}>
₹{p.price}
<button 
      className='btn btn-primary' 
      onClick={() => {
      setCart((prevCart) => {
      const newCart =  [...prevCart, { ...p, price: parseFloat(p.price) }];
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
      });
      toast.success('Item added to cart');
     }}
    >
  +
</button>
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
   </div>
   </div>
  
  );
};



export default Items;
