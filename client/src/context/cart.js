import {useState, useContext, createContext, useEffect} from 'react';

const CartContext = createContext()


const CartProvider = ({children}) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        let currentCartItems = localStorage.getItem('cart');
        if(currentCartItems) {
            setCart(JSON.parse(currentCartItems))
        }
    }, []);

    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => useContext(CartContext);

export {useCart, CartProvider};