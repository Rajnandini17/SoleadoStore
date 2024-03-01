import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import {useCart} from "../context/cart";
import styled from 'styled-components';
import { MdSecurity } from "react-icons/md";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import { Button } from '../styles/Button';


const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [cart, setCart] = useCart();

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
          <Wrapper>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="container">
                {product && (
                  <>
                    <div className="grid grid-two-column" style={{marginBottom: '70px'}}>
                    <div className='product-image'>
                    <img
                        className="card-img-top"
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product.id}`}
                        alt={product.name}
                        style={{ height: '500px', width: '400px', marginLeft: '50px'}}
                      />
                    </div>

                    <div className='product-data'>
                    <h2>{product.name}</h2>
                    <p className="product-data-price">
                      MRP: ₹<del>{parseFloat(product.price) + 1500}</del>
                    </p>
                    <p className='product-data-price product-data-real-price'>
                    Deal of the Day: ₹{product.price}
                    </p>
                    <p>
                      {product.description}
                    </p>
                    <div className="product-data-warranty">
                    <div className="product-warranty-data">
                      <TbTruckDelivery className="warranty-icon" />
                      <p>Free Delivery</p>
                    </div>

                    <div className="product-warranty-data">
                      <TbReplace className="warranty-icon" />
                      <p>30 Days Replacement</p>
                    </div>

                    <div className="product-warranty-data">
                      <MdSecurity className="warranty-icon" />
                      <p>2 Year Warranty </p>
                    </div>
                    </div>

                    <div className="product-data-info">
                      <p>Available: <span>{parseFloat(product.quantity) > 0 ? "In Stock" : "Out of Stock"}</span></p>
                    </div>

        
                    <Button
                  className='btn' 
                  onClick={() => {
                    setCart((prevCart) => {
                      const newCart =  [...prevCart, { ...product, price: parseFloat(product.price) }];
                      localStorage.setItem('cart', JSON.stringify(newCart));
                      return newCart;
                    });
                    toast.success('Item added to cart');
                  }}
                >
                  Add to Cart
                </Button>

                    </div>
                    </div>

                    <hr />

                    <div className="intro-data">Check now!</div>
                    <div className="common-heading">Similar Products</div>
                  
                    {relatedProducts.length < 1 && <p> No Similar Products found!</p> }

                    <div className="grid grid-five-column">
                      {relatedProducts?.map(p => (
                        <div className="card" style={{height: '26rem', width: '18rem'}}>
                        <Link to={`/product/${p.slug}`}>
                        <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p.id}`} alt={p.name}
                          style={{height: '20rem', width: '18rem'}}
                        />
                        </Link>

                        <div style={{textAlign: 'center', fontSize: '15px', fontWeight: 'bold', paddingTop: '5px'}}>{p.name}</div>
                  <div className='grid grid-two-column' style={{fontSize: '12px', fontWeight: 'bold', padding: '5px'}}>
                  ₹{p.price}
                  <button 
                        className='btn btn-primary' 
                        onClick={() => {
                        setCart((prevCart) => {
                        const newCart =  [...prevCart, { ...p, price: parseFloat(p.price) }];
                        localStorage.setItem('cart', JSON.stringify(newCart));
                        return newCart;
                        });
                        toast.success('Item added to cart');
                      }}
                      >
                    +
                  </button>
                  </div>

                        </div>

                  
                      ))}
                    </div>

      </>
  )}
</div>
             
)}
</Wrapper>
)};
  

const Wrapper = styled.section`
.container {
  padding: 9rem, 0;
  margin-bottom: 70px;
}

.product-image {
  margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

.product-data{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2rem;
}

.product-data-warranty {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      margin-bottom: 1rem;

      .product-warranty-data {
        text-align: center;

        .warranty-icon {
          background-color: rgba(220, 220, 220, 0.5);
          border-radius: 50%;
          width: 4rem;
          height: 4rem;
          padding: 0.6rem;
        }
        p {
          font-size: 1.4rem;
          padding-top: 0.4rem;
        }
      }
    }

    .product-data-price {
      font-weight: bold;
    }
    .product-data-real-price {
      color: ${({ theme }) => theme.colors.btn};
    }
    .product-data-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 1.8rem;

      span {
        font-weight: bold;
      }
    }

    hr {
      max-width: 100%;
      width: 90%;
      /* height: 0.2rem; */
      border: 0.1rem solid #000;
      color: red;
    }
  

  ${'' /* .page_loading {
    font-size: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  } */}
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 0 2.4rem;
  }

  .card {
    background-color: #fff;
    border-radius: 1rem;
    

    .card-data {
      padding: 0 2rem;
    }

    .card-data-flex {
      margin: 1rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    h3 {
      color: ${({ theme }) => theme.colors.text};
      text-transform: capitalize;
    }

    .card-data--price {
      color: ${({ theme }) => theme.colors.helper};
    }
  }

`;
          

export default ProductDetails;