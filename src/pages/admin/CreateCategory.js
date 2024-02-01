import React, {useState, useEffect} from 'react';
import AdminMenu from '../../components/Layout/AdminMenu';
import {toast} from 'react-toastify';
import axios from 'axios';
import CategoryForm from '../../components/Layout/CategoryForm';
import {Modal} from 'antd';


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
    <div>
    <AdminMenu />
    <div className='main-content'>
    <div className='container'>
        <h1>Manage category</h1>

        <div >
          <CategoryForm 
          handleSubmit = {handleSubmit} 
          value={name} 
          setValue={setName} 
          />
        </div>
        
        <div className='w-75'>
        <table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      {categories.map(category => (
        <>
        <td key={category.id}>{category.name}</td>
        <td>
        <button 
        className = 'btn btn-primary ms-2' 
        onClick={() => {
          setVisible(true); 
          setUpdatedName(category.name);
          setSelected(category)
          }}
        >
        Edit
        </button></td>
        <td>
        <button 
        className = 'btn btn-danger ms-2' 
        onClick={() => {handleDelete(category.id)
        }}
        >
        Delete
        </button></td>
        </>
      ))}
    </tr>
  </tbody>
</table>
        </div>

        <Modal onCancel={() => setVisible(false)} 
        footer={null} 
        visible={visible}
        >
          <CategoryForm value={updatedName} 
          setValue={setUpdatedName} handleSubmit={handleUpdate}/>
        </Modal>

    </div>
   </div>
    </div>
  )
}

export default CreateCategory