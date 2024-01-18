import React from 'react';
import {Link} from 'react-router-dom';
import  '../../styles/Header.css';

const Header = () => {
  return (
    <>
  <nav>
  <div className="navbar-title">
        <h1>IntelliShop</h1>
      </div>
  <Link className="nav-link" to="/cart">Cart</Link>
  <Link className="nav-link" to="/login">Login</Link>
  <Link className="nav-link" to="/register">Signup</Link>
  <Link className="nav-link" to="/category">Category</Link>
  <Link className="nav-link" to="/">Home</Link>
  {/* <Link className="nav-link"  to="*"></Link className="nav-link" > */}
</nav>
    </>
  );
}

export default Header;
