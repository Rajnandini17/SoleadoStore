import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const CategoryList = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
       if(params.slug) {
        getProductsByCategory();
       } 
    }, [params.slug])

    const getProductsByCategory = async() => {
        try {
            const auth = JSON.parse(localStorage.getItem('auth'));
                const config = {
                  headers: {
                    Authorization: `Bearer ${auth.token}`, 
                  },
                };
                
                const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`, config);
                setProducts(data?.products);
                setCategory(data?.category);

        } catch (error) {
            console.log(error);  
        }
    };
  return (
    <div>
        <div className="container mt-3">
            <h2 className='text-center'>
            {category?.name}
            </h2>
            <h4 className='text-center'>
            {products?.length} results found
            </h4>

            <div className="row">
            <div className="d-flex flex-wrap">

{products?.map(p => (

<div className="card m-2" style={{width: "18rem"}}>
<img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p.id}`} alt={p.name}/>
<div className="card-body">
    <h5 className="card-title">{p.name}</h5>
    <p className="card-text">{p.description}</p>
    <p className="card-text">₹{p.price}</p>

    <button 
    className='btn btn-primary ms-1' 
    onClick={() => navigate(`/product/${p.slug}`)}>
    More Details
    </button>

    <button 
    className='btn btn-secondary ms-1'>
    Add to Cart
    </button>
</div>
</div>

))}
</div>


{/* <div className='m-2 p-3'>
            {products && products.length < total && (
              <button className='btn btn-warning'
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}>
                {loading ? 'Loading...' : 'Loadmore'}
              </button>
            )}
          </div>
 */}

            </div>
        </div>
    </div>
  )
}

export default CategoryList;