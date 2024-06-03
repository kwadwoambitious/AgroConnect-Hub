import React from 'react'
import consumerImage from '../assets/images/signup for consumers.png'
import Signup from './Signup';

const ConsumersSignup = () => {
  return (
    <>
      <Signup title1='A consumer' title2="Get fresh, stay healthy, feel good!" title3='Sign Up page for consumers' info="Eat healthy, live happy. Join AgroConnect Hub and discover a world of nutritious food options, grown with love and care by our community of farmers." image={consumerImage} loginLink='/login-for-consumers'/>
    </>
  )
}

export default ConsumersSignup









