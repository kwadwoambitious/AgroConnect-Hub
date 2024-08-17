// RouteLoader.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from './Loader';

const RouteLoader = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleLoad = () => setLoading(false);

    // Set loading to true when location changes
    setLoading(true);

    // Handle initial load
    if (document.readyState === 'complete') {
      setLoading(false);
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, [location]);

  return (
    <>
      {loading && <Loader />}
      {!loading && children}
    </>
  );
};

export default RouteLoader;
