import React from 'react';
import {Link} from 'react-router-dom';
import useCategory from '../hooks/useCategory';
import styled from 'styled-components';
import BookMain from '../images/books-aesthetic.jpg';
import GadgetMain from '../images/gadget-aesthetic.jpg';
import WatchesMain from '../images/watches-aesthetic.jpg';
import DecorMain from '../images/decor-aesthetic.jpg';
import FootwearMain from '../images/shoe-aesthetic.jpg';
import BagsMain from '../images/bag-aesthetic.jpg';
import ToysMain from '../images/kids-toys-aesthetic.jpg';


const getCategoryImage = (slug) => {
  switch (slug) {
    case 'books':
      return BookMain;
    case 'gadgets':
      return GadgetMain;
    case 'Watches':
      return WatchesMain;
    case 'Decor-items': 
      return DecorMain;
    case 'Footwear':
      return FootwearMain;
    case 'bags':
      return BagsMain;
    case 'kids-toys':
      return ToysMain;    
    default:
      return null;
  }
};

const Categories = () => {
  
    const categories = useCategory();
    
  return (
    <Wrapper>
    <div className="container">
        <div className="row">
        <div className="common-heading">Browse all categories</div>
        <div className="grid grid-three-column">
        {categories.map(c => (
            <div className="card-category" key={c.id}>           
                <Link to={`/category/${c.slug}`}>
                <figure>
                
                    <img src={getCategoryImage(c.slug)} alt={c.name} />
                    <figcaption className="caption">{c.name}</figcaption>
                    
                
                  </figure>
                </Link>
            </div>
        ))}            
        </div>
    </div>
    </div>
    </Wrapper>
  );
};


const Wrapper = styled.section`
  padding: 6rem 0;

  .container {
    max-width: 120rem;
  }

  figure {
    width: 100%;
    height: 100%;
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
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.2s linear;
    }

    .caption {
      position: absolute;
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

  .card-category {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 1rem;
    overflow: hidden;
    }
  `;

export default Categories;