import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { Link } from 'react-router-dom';
import Logout from './Logout';


function ProductManagement({ fetchProducts, products }) {
  const [product, setProduct] = useState({ name: '', description: '', category: '', price: '', quantity: '' });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddOrUpdateProduct = (e) => {
    e.preventDefault();

    if (editingIndex !== null) {
      const updatedProducts = products.map((prod, index) =>
        index === editingIndex ? product : prod
      );
      setEditingIndex(null);
      fetchProducts(); // Refresh products list from the parent
    } else {
      axios.post('http://localhost:5004/add-product', product)
        .then((response) => {
          fetchProducts(); // Refresh the product list from backend after adding new product
        })
        .catch((error) => {
          console.error('Error adding product:', error);
        });
    }

    setProduct({ name: '', description: '', category: '', price: '', quantity: '' });
  };

  const handleEditProduct = (index) => {
    setProduct(products[index]);
    setEditingIndex(index);
  };

  const handleDeleteProduct = (index) => {
    const productId = products[index].id;
    axios.delete(`http://localhost:5004/delete-product/${productId}`)
      .then(() => {
        fetchProducts(); // Fetch updated products after deletion
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  return (
    <div className='product manager'>
      <div className="product-management-container">
        <h2>{editingIndex !== null ? 'Edit Product' : 'PRODUCT MANAGEMENT'}</h2>
        <div className="navigation-container mb-4">
          <div className="navigation-links">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/user-management" className="nav-link">User Management</Link>
            <Logout />
          </div>
        </div>
        <form onSubmit={handleAddOrUpdateProduct}>
          <div>
            <label>Product Name:</label>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Category:</label>
            <input
              type="text"
              value={product.category}
              onChange={(e) => setProduct({ ...product, category: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Quantity:</label>
            <input
              type="number"
              value={product.quantity}
              onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
              required
            />
          </div>
          <button type="submit">{editingIndex !== null ? 'Update Product' : 'Add Product'}</button>
        </form>
        <h3 className="mt-4">Product List</h3>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">No products added yet.</td>
              </tr>
            ) : (
              products.map((prod, index) => (
                <tr key={prod.id}>
                  <td>{index + 1}</td>
                  <td>{prod.name}</td>
                  <td>{prod.description}</td>
                  <td>{prod.category}</td>
                  <td>M{prod.price}</td>
                  <td>{prod.quantity}</td>
                  <td>
                    <button className="btn btn-warning btn-sm" onClick={() => handleEditProduct(index)}>
                      Edit
                    </button>
                    <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDeleteProduct(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductManagement;
