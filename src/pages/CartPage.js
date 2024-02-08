import React, { useState } from 'react';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className='text-center bg-light p-2 mb-2 mt-2'>
                        {`Hello ${auth?.token && auth?.user?.name}`}
                    </h1>
                    <h4 className='text-center'>
                        {cart?.length ?
                        `You have ${cart.length} items in bag ${auth?.token ? "" : "Please Login to checkout"}`
                        : "Your cart is empty" }
                    </h4>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    {
                        cart?.map(p => (
                            <div className="row mb-2 card flex-row">
                                <div className="col-md-4">
                                <img 
                                className="card-img-top" 
                                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p.id}`} 
                                alt={p.name}
                                style={{height: '200px', width: '200px'}} />                                 
                                </div>
                                <div className="col-md-8">
                                <h4>{p.name}</h4>
                                <p>{p.description}</p>
                                <p>Price: {p.price}</p>

                                <button className='btn btn-danger' onClick={() => removeCartItem(p.id)}>Remove</button>


                                </div>
                            </div>
                        ))
                    };
                </div>
                <div className="col-md-4 text-center">
                  <h3>Bag Summary</h3>
                  <p>Total | Checkout | Payment</p>
                  <hr/>
                  <h2>Total: {totalPrice()} </h2>

                </div>
            </div>
        </div>
    </div>
  )
}

export default CartPage;