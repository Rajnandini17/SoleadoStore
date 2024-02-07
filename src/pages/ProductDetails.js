import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        if(params && params.slug) {
            getProduct();
        } 
    }, [params?.slug]);

    const getProduct =  async () => {  
        try {
            const auth = JSON.parse(localStorage.getItem('auth'));
            const config = {
              headers: {
                Authorization: `Bearer ${auth.token}`, 
              },
            };

            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`, config,);
            console.log('API response: ', data);
            setProduct(data?.products);
            getSimilarProducts(data?.products.id, data?.products.category_id)
            setLoading(false); 
        } catch (error) {
            console.log('Error fetching product:',error);
            setLoading(false); 
        }
    };

    //get similar products
    const getSimilarProducts = async(id, cid) => {
        try {
            const auth = JSON.parse(localStorage.getItem('auth'));
            const config = {
              headers: {
                Authorization: `Bearer ${auth.token}`, 
              },
            };

            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${id}/${cid}`, config,);
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
            console.log('Error loading similar products.');
        }
    };


    return (
        <div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="row container mt-2">
              {product && (
                <>
                  <div className="col-md-6">
                    <img
                      className="card-img-top"
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product.id}`}
                      alt={product.name}
                      style={{ height: '500px', width: '400px', marginLeft: '50px'}}
                    />
                  </div>
                  <div className="col-md-6">
                    <h2 className='text-center'>Product details</h2>
                    <h5>Name: {product.name}</h5>
                    <h5>Description: {product.description}</h5>
                    <h5>Price: {product.price}</h5>
                    <button 
                className='btn btn-secondary ms-1'>
                Add to Cart
                </button>
                  </div>
                </>
              )}
            </div>
          )}

          <hr/>
          <div className="row container">
            <h3>Similar Products</h3>

            {relatedProducts.length < 1 && <p> No Similar Products found!</p> }


<div className="d-flex flex-wrap">

{relatedProducts?.map(p => (

<div className="card m-2" style={{width: "18rem"}}>
<img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p.id}`} alt={p.name}/>
<div className="card-body">
    <h5 className="card-title">{p.name}</h5>
    <p className="card-text">{p.description}</p>
    <p className="card-text">₹{p.price}</p>

    <button 
    className='btn btn-secondary ms-1'>
    Add to Cart
    </button>
</div>
</div>

))}

</div>
        
    </div>          
 </div>
);
};
          

export default ProductDetails;