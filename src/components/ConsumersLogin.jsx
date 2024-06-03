import React from 'react'
import consumerImage from '../assets/images/signup for consumers.png'
import Login from './Login';

const ConsumersLogin = () => {
  return (
    <>
      <Login title1='A consumer' title2="Login to Fresh & Quality Produce!" title3='Login page for consumers' info="Discover and shop from a vast network of trusted farmers, access exclusive discounts and promotions, and enjoy fast and convenient home delivery services" image={consumerImage} signupLink='/signup-for-consumers'/>
    </>
  )
}

export default ConsumersLogin









