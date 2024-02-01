import React from 'react';
import  ReactDOM  from 'react-dom';
import App from './App';
import { AuthProvider } from './context/auth';
import 'antd/dist/reset.css';


ReactDOM.render(<AuthProvider><App/></AuthProvider>, document.getElementById('root'));
