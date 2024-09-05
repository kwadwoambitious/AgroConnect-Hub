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

  const addToCart1 = (product) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex((item) => item._id === product._id);
      if (productIndex !== -1) {
        const newCart = [...prevCart];
        newCart[productIndex].quantity += 1;
        toast.success(`${product.name} quantity updated in cart!`, {
          autoClose: 2000,
        });
        return newCart;
      }
      toast.success(`${product.name} added to cart!`, {
        autoClose: 2000,
      });
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const addToCart = (product, quantityToAdd) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex((item) => item._id === product._id);
      if (productIndex !== -1) {
        const newCart = [...prevCart];
        newCart[productIndex].quantity += quantityToAdd;
        toast.success(`${product.name} quantity updated in cart!`, {
          autoClose: 2000,
        });
        return newCart;
      }
      toast.success(`${product.name} added to cart!`, {
        autoClose: 2000,
      });
      return [...prevCart, { ...product, quantity: quantityToAdd }];
    });
  };
  

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const updateCartItem = (productId, quantity) => {
    setCart((prevCart) => {
      const productIndex = prevCart.findIndex((item) => item._id === productId);
      if (productIndex !== -1) {
        const newCart = [...prevCart];
        if (quantity > 0) {
          newCart[productIndex].quantity = quantity;
          toast.success(`Quantity updated to ${quantity}`, { autoClose: 2000 });
        } else {
          newCart.splice(productIndex, 1);
          toast.success(`Product removed from cart`, { autoClose: 2000 });
        }
        return newCart;
      }
      return prevCart;
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart1, addToCart, removeFromCart, updateCartItem }}>
      {children}
      <ToastContainer />
    </CartContext.Provider>
  );
};
