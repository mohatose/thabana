import React from 'react';
import { Link } from 'react-router-dom';
import ProductBarChart from './ProductBarChart';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Logout from './Logout';
import './Dashboard.css'; // Import the CSS file for styling

function Dashboard({ products = [] }) {
  if (products.length === 0) {
    products = [
      {
        id: 1,
        name: "Sample Product 1",
        description: "Description for sample product 1",
        category: "Sample Category",
        price: 50,
        quantity: 5,
        image: "/download.jpeg"  // Path to the image in the public folder
      },
      {
        id: 2,
        name: "Sample Product 2",
        description: "Description for sample product 2",
        category: "Sample Category",
        price: 60,
        quantity: 8,
        image: "/hoi.jpeg"  // Path to the image in the public folder
      },
      {
        id: 3,
        name: "Sample Product 3",
        description: "Description for sample product 3",
        category: "Sample Category",
        price: 70,
        quantity: 10,
        image: "/hoha.jpeg"  // Path to the image in the public folder
      },
    ];
  }

  return (
    <div className='dash'>
      <div className="container mt-4">
        <h1>Dashboard</h1>
        <p>Welcome to the Dashboard! Select a page to manage:</p>
        <div className="navigation-container mb-4">
          <div className="navigation-links">
            <Link to="/product-management" className="nav-link">Product Management</Link>
            <Link to="/user-management" className="nav-link">User Management</Link>
            <Logout />
          </div>
        </div>
        <div className="mt-4">
          <h2>Product Quantity Chart</h2>
          <ProductBarChart products={products} /> {/* Add your ProductBarChart component here */}
        </div>
        <div className="mt-4">
          <h2>Product List</h2>
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No products added yet.
                  </td>
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
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <h2>Product Images</h2>
          <Carousel showArrows={true} autoPlay={true} infiniteLoop={true}>
            {products.map((prod, index) => (
              <div key={index}>
                <img src={prod.image} alt={prod.name} />
                <p className="legend">{prod.name}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
