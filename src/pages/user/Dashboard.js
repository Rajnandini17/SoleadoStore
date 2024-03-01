import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/auth';
import Profile from './Profile';
import CartPage from '../CartPage'; 
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('editProfile');

  const handleNavigateToCheckout = () => {
    setActiveSection('checkout');
  };

  return (
    <Wrapper>
      
      <Container>
        <SideNav>
          <NavOption
            active={activeSection === 'editProfile'}
            onClick={() => setActiveSection('editProfile')}
          >
            Edit Profile
          </NavOption>
          <NavOption
            active={activeSection === 'checkout'}
            onClick={handleNavigateToCheckout}
          >
            Checkout
          </NavOption>
        </SideNav>
        <Divider />
        <DetailsSection>
          {activeSection === 'editProfile' && <Profile />}
          {activeSection === 'checkout' && <CartPage />}
        </DetailsSection>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 40px;
  text-align: center;
`;

// const Heading = styled.h2`
//   margin-bottom: 20px;
// `;

const Container = styled.div`
  display: flex;
  ${'' /* gap: 20px; */}
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  align-items: stretch;
`;

const SideNav = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  background-color: #0a1435;
`;

const NavOption = styled.div`
  cursor: pointer;
  padding: 15px;
  border-bottom: 1px solid #e0e0e0;
  color: ${(props) => (props.active ? '#007bff' : 'white')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #ccc;
  }
`;

const Divider = styled.div`
  width: 1px;
  background-color: #e0e0e0;
`;

const DetailsSection = styled.div`
  flex: 1;
  padding: 20px;
  margin-right: 160px;
`;

export default Dashboard;
