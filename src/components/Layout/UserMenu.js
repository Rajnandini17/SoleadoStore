import React from 'react'
import '../../styles/UserMenu.css';
import {Link} from 'react-router-dom';
import product_icon from '../../images/product.png';
import user_icon from '../../images/user.png';

const UserMenu = () => {
  return (
    <>
   <div className='sidebar'>
    <div className='top'>
        {/* <div className='logo'>
        <h3>Hi admin!</h3>
        {/* <span>Admin Panel</span> */}
        {/* </div> */} 
    </div>
    
    <ul style={{padding: '0px'}}>
        <li>
            <Link className='sideNav-Link' to="/dashboard/user/profile">
            <img className='img-icon-sideNav' src={user_icon} alt='' />
            <span className='sideNav-item'>Profile</span>
            </Link>
        </li>
        <li>
            <Link className='sideNav-Link' to="/dashboard/user/orders">
            <img className='img-icon-sideNav' src={product_icon} alt='' />
            <span className='sideNav-item'>Orders</span>
            </Link>
        </li>
    </ul>
   </div> 

   {/* <div className='main-content'>
    <div className='container'>
        <h1>Hello Admin!</h1>
    </div>
   </div> */}


  </>
  )
}

export default UserMenu