import React from 'react'
import farmerImage from '../assets/images/signup for farmers.webp'
import Login from './Login';

const FarmersLogin = () => {
  return (
    <>
      <Login title1='A farmer' title2="Login to Your Farming Community!" title3='Login page for farmers' info='Manage your farm operations, connect with suppliers and buyers, and access market insights, news, and resources easily and efficiently' image={farmerImage} signupLink='/signup-for-farmers'/>
    </>
  )
}

export default FarmersLogin