import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../styles/Button';
import HeroImg from '../../images/shopping-paper-bag.jpg'

const HeroSection = () => {
  const [placeholder, setPlaceholder] = useState('');
    const placeholderOptions = ['Hello!', 'Hola!', 'Bonjour!'];
    const [index, setIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
          setIndex((prevIndex) => (prevIndex + 1) % placeholderOptions.length);
      }, 3000);

      return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPlaceholder(placeholderOptions[index]);
}, [index]);


    return (
        <Wrapper>
        <div className="container">
            <div className="grid grid-two-column">
              <div className="hero-section-data">
                {/* <p className="intro-data">Welcome to </p> */}
                <h1>{placeholder}
                {/* onFocus={() => setPlaceholder(placeholderOptions[index])}
                onBlur={() => setPlaceholder('')} */}
                </h1>
                
                <p>
                Bienvenidos a SoleadoStore, your ultimate destination for a sunlit shopping experience! 
                At SoleadoStore, we're delighted to present a curated collection that encompasses the warmth of the sun, 
                ensuring you shine in every aspect of life.  
                </p>
                <NavLink to='/items'>
                    <Button>Shop now</Button>
                </NavLink>
              </div> 
              <div className="hero-section-image">
                <figure>
                    <img className='img-style' src={HeroImg} alt='shopping bag' />
                </figure>
              </div>
            </div>
        </div>

    </Wrapper>
    ); 
};

const Wrapper = styled.section`
padding: 12rem 0;

img {
  min-width: 10rem;
  height: 10rem;
}

.hero-section-data {
  p {
    margin: 2rem 0;
  }

  h1 {
    text-transform: capitalize;
    font-weight: bold;
  }

  .intro-data {
    margin-bottom: 0;
  }
}

.hero-section-image {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
figure {
  position: relative;

  &::after {
    content: "";
    width: 60%;
    height: 80%;
    background-color: rgba(81, 56, 238, 0.4);
    position: absolute;
    left: 50%;
    top: -5rem;
    z-index: -1;
  }
}
.img-style {
  width: 100%;
  height: auto;
}

@media (max-width: ${({ theme }) => theme.media.mobile}) {
  .grid {
    gap: 10rem;
  }

  figure::after {
    content: "";
    width: 50%;
    height: 100%;
    left: 0;
    top: 10%;
    /* bottom: 10%; */
    background-color: rgba(81, 56, 238, 0.4);
  }
}
`;

export default HeroSection;