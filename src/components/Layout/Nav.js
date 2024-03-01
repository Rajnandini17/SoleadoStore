import React, {useState} from 'react';
import styled from "styled-components";
import { toast } from 'react-toastify';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import { useAuth } from '../../context/auth';
import SearchInput from './SearchInput';
import { NavLink } from 'react-router-dom';
import {Badge} from 'antd';
import bag_icon from '../../images/bag.png';
import { CgMenu, CgClose } from "react-icons/cg";

const Nav = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const [menuIcon, setMenuIcon] = useState();
  const handleLogout = () => {
    setAuth( prevAuth => ({
      ...prevAuth,
      user: null,
      token: "",
  }));
    localStorage.removeItem("auth");
    toast.success("Logout Successful!");
  }


  const Nav = styled.nav`
    .navbar-lists {
      display: flex;
      gap: 4.8rem;
      align-items: center;

      .navbar-link {
        &:link,
        &:visited {
          display: inline-block;
          text-decoration: none;
          font-size: 1.8rem;
          font-weight: 500;
          text-transform: uppercase;
          color: ${({ theme }) => theme.colors.black};
          transition: color 0.3s linear;
        }

        &:hover,
        &:active {
          color: ${({ theme }) => theme.colors.helper};
        }
      }
    }

    .mobile-navbar-btn {
      display: none;
      background-color: transparent;
      cursor: pointer;
      border: none;
    }

    .mobile-nav-icon[name="close-outline"] {
      display: none;
    }

    .close-outline {
      display: none;
    }

    .cart-trolley--link {
      position: relative;

      .cart-trolley {
        position: relative;
        font-size: 3.2rem;
      }

      .cart-total--item {
        width: 2.4rem;
        height: 2.4rem;
        position: absolute;
        background-color: #000;
        color: #000;
        border-radius: 50%;
        display: grid;
        place-items: center;
        top: -20%;
        left: 70%;
        background-color: ${({ theme }) => theme.colors.helper};
      }
    }

    .user-login--name {
      text-transform: capitalize;
    }

    .user-logout,
    .user-login {
      font-size: 1.4rem;
      padding: 0.8rem 1.4rem;
    }

    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      .mobile-navbar-btn {
        display: inline-block;
        z-index: 9999;
        border: ${({ theme }) => theme.colors.black};

        .mobile-nav-icon {
          font-size: 4.2rem;
          color: ${({ theme }) => theme.colors.black};
        }
      }

      .active .mobile-nav-icon {
        display: none;
        font-size: 4.2rem;
        position: absolute;
        top: 30%;
        right: 10%;
        color: ${({ theme }) => theme.colors.black};
        z-index: 9999;
      }

      .active .close-outline {
        display: inline-block;
      }

      .navbar-lists {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background-color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        visibility: hidden;
        opacity: 0;
        transform: translateX(100%);
        /* transform-origin: top; */
        transition: all 3s linear;
      }

      .active .navbar-lists {
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
        z-index: 999;
        transform-origin: right;
        transition: all 3s linear;

        .navbar-link {
          font-size: 4.2rem;
        }
      }
      .cart-trolley--link {
        position: relative;

        .cart-trolley {
          position: relative;
          font-size: 5.2rem;
        }

        .cart-total--item {
          width: 4.2rem;
          height: 4.2rem;
          font-size: 2rem;
        }
      }

      .user-logout,
      .user-login {
        font-size: 2.2rem;
        padding: 0.8rem 1.4rem;
      }
    }
  `;

  const Dropdown = styled.div`
    position: relative;
    display: inline-block;

    .navbar-link {
      padding: 14px 32px 14px 16px;
      text-decoration: none;
      color: #333;
      font-weight: bold;
      position: relative;
      cursor: pointer;

      &:after {
        content: "\\25BC";
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
      }

      &:hover {
        color: #008080;
      }
    }

    .dropdown-content {
      display: none;
      position: absolute;
      background-color: #f9f9f9;
      min-width: 160px;
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
      z-index: 1;
      border-radius: 5px;
      overflow: hidden;

      a {
        color: #333;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        font-size: 16px;

      }

      a:hover {
        background-color: #ddd;
      }
    }

    &:hover .dropdown-content {
      display: block;
    }
  `;


  return (
   <Nav>
<div className={menuIcon ? "navbar active" : "navbar"}>
<ul className="navbar-lists">

<li className='navbar-link'>
<SearchInput/>
</li>
<li>
<NavLink className="navbar-link cart-trolley--link" to="/cart"  onClick={() => setMenuIcon(false)}>
<Badge count={cart?.length} showZero>
  <img className='img-icon-login' src={bag_icon} alt='' style={{color: 'white'}}/>
  </Badge>
  </NavLink>
  </li>


  {!auth.user ? (
    <>
    <li>
  <NavLink className="navbar-link" to="/login"  onClick={() => setMenuIcon(false)}>Login</NavLink>
  </li>
  <li>
  <NavLink className="navbar-link" to="/register"  onClick={() => setMenuIcon(false)}>Signup</NavLink>
  </li>
    </>
  ) : (
    <>
<li>
<Dropdown>
    <NavLink className="navbar-link">
    {auth?.user?.name} 
    </NavLink>
    <div className="dropdown-content">             
          <li>
             <NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} className="dropdown-item">
                Dashboard
             </NavLink>
         </li>
          <li>
            <NavLink onClick={handleLogout} to="/login" className="dropdown-item">
              Logout
          </NavLink>
         </li>
    
          </div>       
</Dropdown>
  </li>

  {/* <Link className="nav-link" to="/" onClick={handleLogout}>Logout</Link> */}
    </>
  )}

<li>
  <Dropdown>
  <NavLink className="navbar-link">Category</NavLink>
          <div className="dropdown-content">
            <NavLink className='dropdown-item' to={'/categories'} onClick={() => setMenuIcon(false)}>
              All categories
            </NavLink>
            {categories?.map((c) => (
              <NavLink className='dropdown-item' to={`/category/${c.slug}`} onClick={() => setMenuIcon(false)} key={c.id}>
                {c.name}
              </NavLink>
            ))}
          </div>

  </Dropdown>
  </li>
  
<li>
  <NavLink className="navbar-link" to="/"  onClick={() => setMenuIcon(false)}>Home</NavLink>
</li>

</ul>


<div className="mobile-navbar-btn">
    <CgMenu
        name="menu-outline"
        className="mobile-nav-icon"
        onClick={() => setMenuIcon(true)}
    />
    <CgClose
    name="close-outline"
    className="mobile-nav-icon close-outline"
    onClick={() => setMenuIcon(false)}
    />
</div>


</div>

   </Nav>
  )
}

export default Nav;