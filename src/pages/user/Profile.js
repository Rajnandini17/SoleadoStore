import React from 'react'
import UserMenu from '../../components/Layout/UserMenu'

const Profile = () => {
  return (
    <div>
        <UserMenu/>
        <div className='main-content'>
    <div className='container'>
        <h1>Your profile</h1>
    </div>
   </div>
    </div>
  )
}

export default Profile