import React from 'react'
import UserMenu from '../../components/Layout/UserMenu';


const Dashboard = () => {
  return (
    <div>
    <UserMenu />
    <div className='main-content'>
    <div className='container'>
        <h1>Hello User!</h1>
    </div>
   </div>
    </div>
  )
}

export default Dashboard;