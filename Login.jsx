import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve the list of users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the entered username and password match a registered user
    const user = users.find((user) => user.username === username && user.password === password);

    if (user) {
      alert('Login successful!');

      // Save the logged-in user to localStorage
      let loggedUsers = JSON.parse(localStorage.getItem('loggedUsers')) || [];
      loggedUsers.push({ username });
      localStorage.setItem('loggedUsers', JSON.stringify(loggedUsers));

      // Redirect to the Dashboard page
      navigate('/dashboard');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="container2">
      <h1><marquee behavior="alternate" direction="up">WELCOME TO THE WINGS CAFE</marquee></h1>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div className="form-group1">
          <label>Username:</label>
          <input
            type="text"
            className="form-control1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group1">
          <label>Password:</label>
          <input
            type="password"
            className="form-control1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">Login</button>
      </form>

      <p>
        Not registered? <Link to="/register">Create an account</Link>
      </p>
    </div>
  );
}

export default Login;
