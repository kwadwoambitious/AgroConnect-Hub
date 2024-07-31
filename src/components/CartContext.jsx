// CartContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a Context for the cart
const CartContext = createContext();

const initialCartState = [];

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(initialCartState);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
  
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
  
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.product.id !== productId));
  };

  const emptyCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook for using the context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
