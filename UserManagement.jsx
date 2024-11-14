import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import './UserManagement.css';
import axios from 'axios';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    phone: '',
    surname: '',
    email: '',
    access_card: ''
  });

  useEffect(() => {
    // Fetch users from the backend API
    axios.get('http://localhost:5004/users')
      .then((response) => {
        console.log('Users fetched successfully:', response.data); // Added console log
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleDeleteUser = (userId) => {
    axios.delete(`http://localhost:5004/users/${userId}`)
      .then(() => {
        console.log(`User with id ${userId} deleted successfully`); // Added console log
        setUsers(users.filter((user) => user.id !== userId));
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();

    // Send POST request to add new user to the backend
    axios.post('http://localhost:5004/users', newUser)
      .then((response) => {
        console.log('User added successfully:', response.data); // Added console log
        // Append the new user to the user list
        setUsers((prevUsers) => [...prevUsers, response.data]);

        // Clear form inputs
        setNewUser({
          username: '',
          password: '',
          phone: '',
          surname: '',
          email: '',
          access_card: ''
        });
        alert('User added successfully!');
      })
      .catch((error) => {
        console.error('Error adding user:', error);
      });
  };

  return (
    <div className="user-management-container">
      <h2>USER MANAGEMENT</h2>
      <div className="navigation-container mb-4">
        <div className="navigation-links">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/product-management" className="nav-link">Product Management</Link>
          <Logout />
        </div>
      </div>

      {/* Add User Form */}
      <div className="add-user-form mt-4">
        <h3>Add New User</h3>
        <form onSubmit={handleAddUser}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={newUser.username}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={newUser.password}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={newUser.phone}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            value={newUser.surname}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="access_card"
            placeholder="Access Card #"
            value={newUser.access_card}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="btn btn-primary">Add User</button>
        </form>
      </div>

      {/* User List Table */}
      <h3 className="mt-4">Registered Users</h3>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Access Card #</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center">
                No users registered yet.
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.phone}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
                <td>{user.access_card}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagement;
