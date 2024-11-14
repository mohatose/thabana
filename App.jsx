import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Registration from './Registration';
import Login from './Login';
import Dashboard from './Dashboard';
import UserManagement from './UserManagement';
import ProductManagement from './ProductManagement';
import './styles.css';

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    axios.get('http://localhost:5004/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const updateProducts = (newProducts) => {
    setProducts(newProducts);
    // Optionally, you can save products to localStorage if needed
    // localStorage.setItem('products', JSON.stringify(newProducts));
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard products={products} />} /> {/* Pass products to Dashboard */}
          <Route path="/user-management" element={<UserManagement />} />
          <Route
            path="/product-management"
            element={<ProductManagement products={products} updateProducts={updateProducts} fetchProducts={fetchProducts} />}
          /> {/* Pass products, updateProducts and fetchProducts to ProductManagement */}
          <Route path="/" element={<Login />} /> {/* Default route to Login */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
