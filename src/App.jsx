import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import About from './components/About';
import FarmersSignup from './components/FarmersSignup';
import ConsumersSignup from './components/ConsumersSignup';
import ContactUs from './components/ContactUs';
import FarmersLogin from './components/FarmersLogin';
import ConsumersLogin from './components/ConsumersLogin';
import ScrollToTop from './components/ScrollToTop';
import AllProducts from './components/AllProducts';
// import ResetPassword from './components/ResetPassword';

function App({ showModal }) {

  return (
    <>
     <BrowserRouter>
     <ScrollToTop />
        <div className={`App font-poppins ${showModal ? 'h-screen w-screen overflow-hidden' : ''}`} style={{ position: showModal ? 'fixed' : 'relative' }}>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact-us' element={<ContactUs />} />
            <Route path='/signup-for-farmers' element={<FarmersSignup />} />
            <Route path='/signup-for-consumers' element={<ConsumersSignup />} />
            <Route path='/login-for-farmers' element={<FarmersLogin />} />
            <Route path='/login-for-consumers' element={<ConsumersLogin />} />
            <Route path='/all-products' element={<AllProducts />} />
            {/* <Route path='/reset-password' element={<ResetPassword />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
