import React from 'react'
import { useSearch } from '../context/search'
import {Link} from 'react-router-dom';
import {useCart} from "../context/cart";
import {toast} from 'react-toastify';



const SearchLanding = () => {
    const [values, setValues] = useSearch();
    const [cart, setCart] = useCart();


  return (
    <div>
    <div className="container">
        <div className="text-center">
<h3 style={{paddingTop: '3rem', fontWeight: 'bold'}}>Search Result</h3>
<h5 style={{paddingBottom: '3rem', fontWeight: 'bold'}}>{values?.result.length < 1 
? 'No Products found' 
: `Found ${values?.result.length}`}
</h5>


<div className="grid grid-three-column">
    {values?.result.map((p) => (
        <div className="card" style={{width: "18rem", height: "26rem"}}>
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


    </div>
    </div>
    </div>
  )
}

export default SearchLanding;