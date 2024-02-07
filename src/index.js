import React from 'react';
import  ReactDOM  from 'react-dom';
import App from './App';
import { AuthProvider } from './context/auth';
import { SearchProvider } from './context/search';
import 'antd/dist/reset.css';


ReactDOM.render(
<AuthProvider>
<SearchProvider>  
<App/> 
</SearchProvider>
</AuthProvider>, document.getElementById('root'));
