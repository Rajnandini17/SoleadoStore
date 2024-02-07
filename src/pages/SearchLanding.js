import React from 'react'
import { useSearch } from '../context/search'

const SearchLanding = () => {
    const [values, setValues] = useSearch();
  return (
    <div>
    <div className="container">
        <div className="text-center">
<h1>Search Result</h1>
<h6>{values?.result.length < 1 
? 'No Products found' 
: `Found ${values?.result.length}`}
</h6>


<div className="d-flex flex-wrap mt-4">
    {values?.result.map((p) => (
        <div className="card m-2" style={{width: "18rem"}}>
            <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p.id}`} alt={p.name}/>
            <div className="card-body">
            <h5 className="card-title">{p.name}</h5>
            <p className="card-text">{p.description}</p>
            <p className="card-text">₹{p.price}</p>
            <button className='btn btn-primary ms-1'>More Details</button>
            <button className='btn btn-secondary ms-1'>Add to Cart</button>
        </div>
        </div> 
    ))}
</div>


    </div>
    </div>
    </div>
  )
}

export default SearchLanding;