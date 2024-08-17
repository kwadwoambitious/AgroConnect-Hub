import React, { useState } from 'react';
import axios from 'axios';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [quantity, setQuantity] = useState('');
  const [categories, setCategories] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://api-agroconnect.onrender.com/api/v1/products', {
        name,
        brand,
        quantity,
        categories,
        price,
      });

      setMessage('Product created successfully!');
    } catch (error) {
      setMessage('Error creating product.');
      console.error('Error:', error);
    }
  };

  return (
    <div className='h-screen flex items-center justify-center flex-col'>
      <h1 className='mb-5 text-xl font-semibold'>Create New Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className='border focus:outline-none mb-7' />
          </label>
        </div>
        <div>
          <label>
            Brand:
            <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required className='border focus:outline-none mb-7' />
          </label>
        </div>
        <div>
          <label>
            Quantity:
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required className='border focus:outline-none mb-7' />
          </label>
        </div>
        <div>
          <label>
            Categories:
            <input type="text" value={categories} onChange={(e) => setCategories(e.target.value)} required className='border focus:outline-none mb-7' />
          </label>
        </div>
        <div>
          <label>
            Price:
            <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className='border focus:outline-none mb-7' />
          </label>
        </div>
        <button type="submit" className='bg-[#2E982D] text-white p-2 rounded'>Create Product</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateProduct;
