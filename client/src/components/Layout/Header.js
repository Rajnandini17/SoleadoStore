import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Nav from "./Nav";


const Header = () => {

  

  return <MainHeader>
  <NavLink to='/'>
    <h1 style={{fontFamily: "McLaren, cursive",
    fontWeight: "200", fontSize: '3.5rem'}}>SoleadoStore</h1>
  </NavLink>
  <Nav />
  </MainHeader>
};

const MainHeader = styled.header`
padding: 0 4.8rem;
height: 10rem;
background-color: ${({theme}) => theme.colors.bg};
display: flex;
justify-content: space-between;
align-items: center;
position: relative;
`;

export default Header;