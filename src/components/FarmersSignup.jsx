import React from 'react'
import farmerImage from '../assets/images/signup for farmers.webp'
import Signup from './Signup';

const FarmersSignup = () => {
  return (
    <>
      <Signup title1='A farmer' title2="Farm Smart, Connect Easy!" title3='Sign Up page for farmers' info='Unlock the full potential of your land. Our platform provides innovative solutions, data insights, and community knowledge to optimize your yields and profits.' image={farmerImage} loginLink='/login-for-farmers'/>
    </>
  )
}

export default FarmersSignup