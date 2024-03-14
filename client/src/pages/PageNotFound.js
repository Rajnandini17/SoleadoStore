import React from 'react';
import '../styles/Pagenotfound.css';
import { Link } from 'react-router-dom';
// import {Link} from 'react-router-dom';


const PageNotFound = () => {
  return (
    <div className='pageAbsent'>
    <h1>404</h1>
    <p>Sorry, we couldn't find this page. But don't worry you can find <br />
    plenty of other things on our <Link to="/">HomePage.</Link> 
    </p>
    </div>
  )
}

export default PageNotFound;