import React from 'react';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";




const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();
    

    
    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.forEach((item) => {
                total += parseFloat(item.price);
            });
            console.log("Cart:", cart); // Add this line for logging
            return total.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
            });
        } catch (error) {
            console.error("Error calculating total price:", error);
            return "Error";
        }
    };
    

    //delete item
    const removeCartItem = (pid) => {
        try {
           let myCart = [...cart];
           let index = myCart.findIndex(item => item.id === pid);
           myCart.splice(index, 1);
           setCart(myCart);
           localStorage.setItem('cart', JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };




    const containerStyle = {
        paddingLeft: '70px',
        paddingRight: '70px',
        marginTop: '30px 0px',
    };

    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
        tableLayout: 'fixed',
    };

    const headStyle = {
        fontWeight: '700',
        fontSize: '16px',
        background: '#0a1435',
        color: '#fff',
        border: 'none',
        padding: '6px 0',
        textAlign: 'center'
    }

    const tdStyle = {
        border: '1px solid black',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: '500',
    };

    const cartBottomStyle = {
        paddingLeft: '70px',
        paddingRight: '70px',
        marginTop: '30px 0px',

    }
    

    
    

  return (

    <>
    <div>
    <h2 style={{textAlign: 'center', marginTop: '20px', marginBottom: '10px'}}>
                        {`Hi ${auth?.token && auth?.user?.name}`}
                    </h2>
                    <h3 style={{marginBottom: '25px', textAlign: 'center'}}>
                        {cart?.length ?
                        `You have ${cart.length} items in bag ${auth?.token ? "" : "Please Login to checkout"}`
                        : "Your cart is empty" }
                    </h3>

<div className="cart-container" style={containerStyle}>
    <table width="100%" style={tableStyle}>
    <thead style={headStyle}>
        <tr>
            <td>Remove</td>
            <td>Image</td>
            <td>Product</td>
            <td>Price</td>
            {/* <td>Total</td> */}
        </tr>

    </thead>
    <tbody>
{
    cart?.map(p => (
        <tr>
            <td style={tdStyle}><MdDelete onClick={() => removeCartItem(p.id)} style={{fontSize: '24px', color: 'red'}}/></td>
            <td  style={tdStyle}>
            <img 
            style={{height: '140px', width: '130px', objectFit: 'cover'}}
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p.id}`}
            alt={p.name} />
            </td>
            <td  style={tdStyle}>{p.name}</td>
            <td  style={tdStyle}>₹{p.price}</td>
        </tr>                  
    ))
};
    </tbody>
    </table>
</div>

<div className="cart-bottom" style={cartBottomStyle}>
<div className="row">
    <div className="coupon-section col-lg-6 col-md-6 col-12 mb-4">
    <div style={{border: '1px solid black'}}>
        <h5 style={{background: '#0a1435', color: '#fff', fontSize: '14px', fontWeight: '700', padding: '6px 12px', border: 'none'}}>
        COUPON</h5>
        <p style={{padding: '0 12px', fontWeight: '500'}}>Enter coupon code if available</p>
        <input type='text' placeholder='Coupon code' style={{padding: '0 12px', height: '44px', margin: '0 0 20px 12px'}}/>
        <button className='btn btn-dark'>APPLY COUPON</button>
    </div>

    </div>

    <div className="total col-lg-6 col-md-6 col-12" >
    <div style={{border: '1px solid black'}}>
        <h5 style={{background: '#0a1435', color: '#fff', fontSize: '14px', fontWeight: '700', padding: '6px 12px', border: 'none'}}>
        CART TOTAL</h5>
        <div className='d-flex justify-content-between'>
            <h4>Subtotal</h4>
            <p>{totalPrice()}</p>
        </div>
        <div className='d-flex justify-content-between'>
            <h4>Shipping</h4>
            <p>Free</p>
        </div>

    <hr />
    <div className='d-flex justify-content-between'>
            <h4>Total</h4>
            <p>{totalPrice()}</p>
        </div>

<button className='btn btn-dark'
>PROCEED TO CHECKOUT</button>

   </div>
</div>
</div>
</div>

</div>

</>

  )
}

export default CartPage;