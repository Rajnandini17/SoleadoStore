import React from 'react';
import {Link} from 'react-router-dom';
import  '../../styles/Header.css';
import { useAuth } from '../../context/auth';
import { toast } from 'react-toastify';


const Header = () => {
  const [auth, setAuth] = useAuth();
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
  <div className="navbar-title">
        <h1>IntelliShop</h1>
      </div>
  <Link className="nav-link" to="/cart">Cart</Link>

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
  <Link className="nav-link" to="/category">Category</Link>
  <Link className="nav-link" to="/">Home</Link>
  {/* <Link className="nav-link" to="*"> PageNotFound</Link> */}
</nav>
    </>
  );
}

export default Header;
