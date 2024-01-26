import React from 'react'
import '../../styles/AdminMenu.css';
import AdminMenu from '../../components/Layout/AdminMenu';

const adminDashboard = () => {
  return (
    <div>
      <AdminMenu/>
      <div className='main-content'>
    <div className='container'>
        <h1>Hi admin!</h1>
    </div>
   </div>
    </div>

  )
}

export default adminDashboard