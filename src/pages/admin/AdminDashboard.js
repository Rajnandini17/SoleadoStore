import React, {useState} from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
import CreateCategory from './CreateCategory';
import CreateProduct from './CreateProduct';
import Products from './Products';
import UpdateProduct from './UpdateProduct';



const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('createCategory');

  return (
    <Wrapper>
      
    <Container>
      <SideNav>
        <NavOption
          active={activeSection === 'createCategory'}
          onClick={() => setActiveSection('createCategory')}
        >
          Create Category
        </NavOption>
        <NavOption
          active={activeSection === 'createProducts'}
          onClick={() => setActiveSection('createProducts')}
        >
          Create Products
        </NavOption>
        <NavOption
          active={activeSection === 'Products'}
          onClick={() => setActiveSection('Products')}
        >
          View Products
        </NavOption>
        <NavOption
          active={activeSection === 'updateProduct'}
          onClick={() => setActiveSection('updateProduct')}
        >
          Update Product
        </NavOption>
      </SideNav>
      <Divider />
      <DetailsSection>
        {activeSection === 'createCategory' && <CreateCategory />}
        {activeSection === 'createProducts' && <CreateProduct />}
        {activeSection === 'Products' && <Products />}
        {activeSection === 'updateProduct' && <UpdateProduct />}
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

export default AdminDashboard;