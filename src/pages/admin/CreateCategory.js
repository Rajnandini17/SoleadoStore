import React, {useState, useEffect} from 'react';
import {toast} from 'react-toastify';
import axios from 'axios';
import CategoryForm from '../../components/Layout/CategoryForm';
import {Modal} from 'antd';
import styled from 'styled-components';
import { LiaEdit } from "react-icons/lia";
import { MdDeleteOutline } from "react-icons/md";


const Wrapper = styled.div`
  padding: 20px;
`;

const Container = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.h3`
  text-align: center;
  margin-bottom: 20px;
  font-weight: 700;
`;

const Table = styled.table`
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #ccc;
  color: black;
  padding: 10px;
  text-align: center;
  font-size: 16px;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  font-size: 14px;
`;

// const Button = styled.button`
//   margin-right: 8px;
//   font-size: 14px;
// `;


const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");



  //handle form
  const handleSubmit = async(event) => {
    event.preventDefault()
    try {

      const auth = JSON.parse(localStorage.getItem('auth'));

      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`, 
        },
      };

     
      
      const category = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, {name}, config
      );
      if(category.data.success) {
        toast.success(`${name} is created.`);
        getAllCategory();
      } else {
        toast.error(category.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  }

  //getting all categories
  const getAllCategory = async() => {
    try {

      const auth = JSON.parse(localStorage.getItem('auth'));

      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`, 
        },
      };
      
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`, config);
      
      if (data?.success) {
        setCategories(data?.category);
      } 
    } catch (error) {
      console.log(error);
      toast.error('Error in getting categories');
    }
  };

useEffect(() => {
  getAllCategory();
}, []);

//update category
const handleUpdate = async(event) => {
  event.preventDefault();
  try {

    const auth = JSON.parse(localStorage.getItem('auth'));

      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`, 
        },
      };
    

    const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected.id}`, 
    {name: updatedName}, config,);
    if(data.success) {
      toast.success(`Category is updated`);
      setSelected(null);
      setUpdatedName("");
      setVisible(false);
      getAllCategory();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error('Something went wrong.');
  }
}

//delete category
const handleDelete = async(id) => {
  try {

    const auth = JSON.parse(localStorage.getItem('auth'));

      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`, 
        },
      };

    const {data} = await axios.delete(`/api/v1/category/delete-category/${id}`,
    config,);
    if (data.success) {
      toast.success(`${name} is deleted`);

      getAllCategory();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error('Something went wrong.');
  }
};


  return (
    <Wrapper>
    <Container>
        <Heading>Manage category</Heading>

        <div >
          <CategoryForm 
          handleSubmit = {handleSubmit} 
          value={name} 
          setValue={setName} 
          />
        </div>
        
        <Table>
  <thead>
    <tr>
      <Th scope="col">Category Name</Th>
      <Th scope="col">Actions</Th>
    </tr>
  </thead>
  <tbody>
    
      {categories.map(category => (
        <tr key={category.id}>
        <Td>{category.name}</Td>
        <Td>
        
        <LiaEdit
       style={{fontSize: '20px', color: '#0a1435'}}
        onClick={() => {
          setVisible(true); 
          setUpdatedName(category.name);
          setSelected(category)
          }}
        />
        
        
        
        <MdDeleteOutline 
        style= {{fontSize: '20px', color: 'red'}}
        onClick={() => {handleDelete(category.id)
        }}
        />
        
        
        </Td>
        </tr>
      ))}
  </tbody>
</Table>
        

        <Modal onCancel={() => setVisible(false)} 
        footer={null} 
        visible={visible}
        >
          <CategoryForm value={updatedName} 
          setValue={setUpdatedName} handleSubmit={handleUpdate}/>
        </Modal>

   </Container>
    </Wrapper>
  );
};

export default CreateCategory;