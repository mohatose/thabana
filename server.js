const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 5004;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'ntj@nalanga#28',
  database: 'wingscafeinventory',
  port: 3306
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
  } else {
    console.log('Connected to the MySQL database.');
  }
});

// Route to add a new user
app.post('/users', (req, res) => {
  const { username, phone, surname, email, access_card } = req.body;
  console.log("Received add-user request with data:", req.body);

  const query = 'INSERT INTO users (username, phone, surname, email, access_card) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [username, phone, surname, email, access_card], (error, results) => {
    if (error) {
      console.error('Error adding user:', error);
      res.status(500).json({ error: 'Database error' });
    } else {
      console.log('User added successfully with ID:', results.insertId);
      res.status(200).json({ id: results.insertId, ...req.body });
    }
  });
});

// Route to get all users
app.get('/users', (req, res) => {
  console.log("Received get-users request");
  const query = 'SELECT * FROM users';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Database error' });
    } else {
      console.log('Fetched users successfully:', results);
      res.status(200).json(results);
    }
  });
});

// Route to delete a user
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  console.log("Received delete-user request for ID:", userId);

  const query = 'DELETE FROM users WHERE id = ?';
  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Database error' });
    } else {
      console.log('User deleted successfully with ID:', userId);
      res.status(200).json({ id: userId });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
