import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import ShoeHeroImg from '../../images/shoe-aesthetic.jpg';
import BagHeroImg from '../../images/bag-aesthetic.jpg';
import ToysHeroImg from '../../images/kids-toys-aesthetic.jpg';


const FeatureProduct = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useEffect(() => {
    const fetchFeaturedCategories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-featured-categories`);
        setFeaturedCategories(response.data.categories);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching featured categories:', error);
        setIsLoading(false);
      }
    };

    fetchFeaturedCategories();
  }, []);

  const getCategoryImage = (slug) => {
    switch (slug) {
      case 'Footwear':
        return ShoeHeroImg;
      case 'bags':
        return BagHeroImg;
      case 'kids-toys':
        return ToysHeroImg;
      default:
        return null;
    }
  };

  return (
    <Wrapper className="section">
      <div className="container">
        <div className="intro-data">Check Now!</div>
        <div className="common-heading">Our Best-selling categories</div>
        <div className="grid grid-three-column">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            featuredCategories.map((category) => (
              <div key={category.id} className="card">
                <Link to={`/category/${category.slug}`}>
                <figure>
                    <img src={getCategoryImage(category.slug)} alt={category.name} />
                    <figcaption className="caption">{category.name}</figcaption>
                  </figure>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </Wrapper>
  );
};


const Wrapper = styled.section`
  padding: 9rem 0;
  background-color: ${({ theme }) => theme.colors.bg};

  .container {
    max-width: 120rem;
  }

  figure {
    ${'' /* width: auto; */}
    width: 100%;
    height: 100%; /* Add */
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.2s linear;
      cursor: pointer;
    }
    &:hover::after {
      width: 100%;
    }
    &:hover img {
      transform: scale(1.2);
    }
    img {
      ${'' /* max-width: 100%;
      margin-top: 1.5rem;
      height: 20rem;
      transition: all 0.2s linear; */}
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.2s linear;
    }

    .caption {
      position: absolute;
      ${'' /* top: 15%;
      right: 10%; */}
      top: 10%;
      left: 30%;
      transform: translate(-50%, -50%);
      text-transform: uppercase;
      background-color: ${({ theme }) => theme.colors.bg};
      color: ${({ theme }) => theme.colors.helper};
      padding: 0.8rem 2rem;
      font-size: 1.5rem;
      font-weight: bold;
      border-radius: 2rem;
      z-index: 1;
    }
  }

  .card {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 1rem;
    overflow: hidden;

    .card-data {
      ${'' /* padding: 0 2rem; */}
      padding: 0;
    }

    .card-data-flex {
      margin: 2rem 0;
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

    .btn {
      margin: 2rem auto;
      background-color: rgb(0 0 0 / 0%);
      border: 0.1rem solid rgb(98 84 243);
      display: flex;
      justify-content: center;
      align-items: center;

      &:hover {
        background-color: rgb(98 84 243);
      }

      &:hover a {
        color: #fff;
      }
      a {
        color: rgb(98 84 243);
        font-size: 1.4rem;
      }
    }
  }
`;


export default FeatureProduct;
