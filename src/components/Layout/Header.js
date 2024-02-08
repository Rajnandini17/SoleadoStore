import React from 'react';
import {Link} from 'react-router-dom';
import  '../../styles/Header.css';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';
import SearchInput from './SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import {Badge} from 'antd';
import bag_icon from '../../images/bag.png';


const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth( prevAuth => ({
      ...prevAuth,
      user: null,
      token: "",
  }));
    localStorage.removeItem("auth");
    toast.success("Logout Successful!");
  }
  return (
    <>
  <nav>
  <div className="navbar-title-h1">
        <h1>IntelliShop</h1>
      </div>

<div className='header-search-bar'>
<SearchInput/>
</div>
      

<Link className="nav-link-cart" to="/cart">
<Badge count={cart?.length} showZero>
  <img className='img-icon-login' src={bag_icon} alt='' style={{color: 'white'}}/>
  </Badge>
  </Link>


  {!auth.user ? (
    <>
  <Link className="nav-link" to="/login">Login</Link>
  <Link className="nav-link" to="/register">Signup</Link>
    </>
  ) : (
    <>

    <Link className="nav-link-dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      // href="#"
                      // role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="dropdown-item">
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </Link>

  {/* <Link className="nav-link" to="/" onClick={handleLogout}>Logout</Link> */}
    </>
  )}

  
  <Link className="nav-link-dropdown">
  <Link
    className="nav-link dropdown-toggle"  
    to={'/categories'}          
    data-bs-toggle="dropdown"
    >
    Category
  </Link>

 <ul className="dropdown-menu">
 <li>
  <Link className='dropdown-item' to ={'/categories'}>
    All categories
  </Link>
 </li>
 {categories?.map((c) => (
  <li>
    <Link className='dropdown-item' to ={`/category/${c.slug}`}>
      {c.name}
    </Link>
  </li>
 ))}
 </ul>
  </Link>


  <Link className="nav-link" to="/">Home</Link>
  {/* <Link className="nav-link" to="*"> PageNotFound</Link> */}
</nav>
    </>
  );
}

export default Header;
