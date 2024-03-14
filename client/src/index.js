import React from 'react';
import  ReactDOM  from 'react-dom';
import App from './App';
import { AuthProvider } from './context/auth';
import { SearchProvider } from './context/search';
import 'antd/dist/reset.css';
import { CartProvider } from './context/cart';


ReactDOM.render(
<AuthProvider>
<SearchProvider> 
<CartProvider>
<App/> 
</CartProvider>
</SearchProvider>
</AuthProvider>, document.getElementById('root'));
