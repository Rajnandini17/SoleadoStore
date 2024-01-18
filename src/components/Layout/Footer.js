import React from 'react'
import { Link } from 'react-router-dom';
import '../../styles/Footer.css';

function Footer() {
    const year = new Date().getFullYear(); 
    return(
        <div className='footer'>
        <h4>Copyright Ⓒ {year} </h4>
        <p>
            <Link className="nav-link-footer" to="/about">About</Link>| 
            <Link className="nav-link-footer" to="/contact">Contact</Link>| 
            <Link className="nav-link-footer" to="/policy">Privacy Policy</Link>
        </p>
        </div>
    );
}

export default Footer;


      
      