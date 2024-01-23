import React from 'react';
import { useAuth } from '../context/auth';


const HomePage = () => {
  const [auth] = useAuth()
  return (
    <>
    <h1>HomePage</h1>
    <pre>{JSON.stringify(auth, null, 4)}</pre>
    </>
  )
}

export default HomePage;

