import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex((item) => item._id === product._id);
      if (productIndex !== -1) {
        const newCart = [...prevCart];
        newCart[productIndex].quantity += 1;
        toast.success(`${product.name} quantity updated in cart!`, {
          autoClose: 2000,
        }
        );
        return newCart;
      }
      toast.success(`${product.name} added to cart!`, {
        autoClose: 2000,
      });
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
      <ToastContainer />
    </CartContext.Provider>
  );
};
