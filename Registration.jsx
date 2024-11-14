import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [accessCard, setAccessCard] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate if all fields are filled
    if (!username || !password || !phone || !surname || !email || !accessCard) {
      alert('All fields are required!');
      return;
    }

    // Create the user object with all the data
    const newUser = {
      username,
      password,
      phone,
      surname,
      email,
      accessCard,
    };

    // Get existing users from localStorage or initialize an empty array
    let users = JSON.parse(localStorage.getItem('users'));
    if (!Array.isArray(users)) {
      users = [];
    }

    // Add the new user to the users array
    users.push(newUser);

    // Save the updated users array to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! Please login.');

    // Redirect to the login page after registration
    navigate('/login');
  };

  return (
    <div className="container2">
      <h1 className="header"><marquee behavior="alternate" direction="up">REGISTER WINGS INVENTORY</marquee></h1>
      <h2 className="form-title1">Register</h2>
      <form onSubmit={handleSubmit} className="form1">
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

        <div className="form-group1">
          <label>Phone Number:</label>
          <input
            type="text"
            className="form-control1"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div className="form-group1">
          <label>Surname:</label>
          <input
            type="text"
            className="form-control1"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>

        <div className="form-group1">
          <label>Email:</label>
          <input
            type="email"
            className="form-control1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group1">
          <label>Access Card #:</label>
          <input
            type="text"
            className="form-control1"
            value={accessCard}
            onChange={(e) => setAccessCard(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default Registration;
