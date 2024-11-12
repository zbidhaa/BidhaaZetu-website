const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',   // Hapa utatumia host yako ya database
  user: 'root',        // User name wa database yako
  password: '',        // Password ya database yako
  database: 'bidhaa_zetu_db'  // Hapa ni database yako
});

// Connect to MySQL database
db.connect((err) => {
  if (err) {
    console.log('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to the database!');
});

// Serve static files from "public" directory
app.use(express.static('public'));

// Middleware for parsing POST request data
app.use(express.json());

// Route ya utafutaji wa bidhaa
app.get('/search', (req, res) => {
  const { query, category } = req.query;

  let sql = 'SELECT * FROM products WHERE name LIKE ?';
  let queryParams = [`%${query}%`];

  if (category && category !== 'all') {
    sql += ' AND category = ?';
    queryParams.push(category);
  }

  db.query(sql, queryParams, (err, results) => {
    if (err) {
      console.log('Error executing query: ', err);
      return res.status(500).send('Error executing query');
    }

    res.json(results);
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
