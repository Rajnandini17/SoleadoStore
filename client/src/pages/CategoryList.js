import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom';
import {useCart} from "../context/cart";
import {toast} from 'react-toastify';


const CategoryList = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [cart, setCart] = useCart();

    useEffect(() => {
       if(params.slug) {
        getProductsByCategory();
       } 
    }, [params.slug])

    const getProductsByCategory = async() => {
        try {
            const auth = JSON.parse(localStorage.getItem('auth'));
                const config = {
                  headers: {
                    Authorization: `Bearer ${auth.token}`, 
                  },
                };
                
                const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`, config);
                setProducts(data?.products);
                setCategory(data?.category);

        } catch (error) {
            console.log(error);  
        }
    };
  return (
    <div>
        <div className="container">
        <div className="intro-data">Check now!</div>
        <div className="common-heading"> {products?.length} results found</div>
            {/* <h2 className='text-center'>
            {category?.name}
            </h2>
            <h4 className='text-center'>
            {products?.length} results found
            </h4> */}

            {/* <div className="row"> */}
{/* <div className="flex" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}> */}
<div className='grid grid-five-column'>

{products?.map(p => (
  
<div className="card" style={{width: '18rem', height: '26rem'}}>
<Link to={(`/product/${p.slug}`)}>
<img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p.id}`} alt={p.name}
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


    {/* <button 
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
</button> */}







{/* <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p.id}`} alt={p.name}/> */}
{/* <div className="card-body">
    <h5 className="card-title">{p.name}</h5>
    <p className="card-text">{p.description}</p>
    <p className="card-text">₹{p.price}</p>

    <button 
    className='btn btn-primary ms-1' 
    onClick={() => navigate(`/product/${p.slug}`)}>
    More Details
    </button> */}

    {/* <button 
    className='btn btn-secondary ms-1'>
    Add to Cart
    </button> */}

    {/* <button 
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
              </button> */}

</div>


))}
</div>


{/* <div className='m-2 p-3'>
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
 */}
 </div>

            </div>


  )
}

export default CategoryList;