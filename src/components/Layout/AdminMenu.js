import React from 'react'
import '../../styles/AdminMenu.css';
import {Link} from 'react-router-dom';
import category_icon from '../../images/category.png';
import product_icon from '../../images/product.png';
import user_icon from '../../images/user.png';

const AdminMenu = () => {
  return (
    <>
   <div className='sidebar'>
    <div className='top'>
        {/* <div className='logo'>
        <h3>Hi admin!</h3>
        {/* <span>Admin Panel</span> */}
        {/* </div> */} 
    </div>
    
    <ul>
        <li>
            <Link className='sideNav-Link' to="/dashboard/admin/create-category">
            <img className='img-icon-sideNav' src={category_icon} alt='' />
            <span className='sideNav-item'>Category</span>
            </Link>
        </li>
        <li>
            <Link className='sideNav-Link' to="/dashboard/admin/create-product">
            <img className='img-icon-sideNav' src={product_icon} alt='' />
            <span className='sideNav-item'>Products</span>
            </Link>
        </li>
        <li>
            <Link className='sideNav-Link' to="/dashboard/admin/users">
            <img className='img-icon-sideNav' src={user_icon} alt='' />
            <span className='sideNav-item'>Users</span>
            </Link>
        </li>
    </ul>
   </div> 

   <div className='main-content'>
    <div className='container'>
        <h1>Hello Admin!</h1>
    </div>
   </div>


  </>
  )
}

export default AdminMenu