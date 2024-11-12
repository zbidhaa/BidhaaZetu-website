// Import Express na mysql2
const express = require('express');
const mysql = require('mysql2');

// Kuunda Express app
const app = express();
const port = 3000; // Port yetu ya server

// Kuunganisha na database ya 'bidhaa_zetu_db'
const db = mysql.createConnection({
  host: 'localhost',     // Host ya MySQL, kwa kawaida ni 'localhost' kwenye kompyuta yako
  user: 'root',          // Jina la mtumiaji wa MySQL, unaweza kuwa 'root' au mwingine
  password: '',          // Nenosiri la MySQL mtumiaji wako
  database: 'bidhaa_zetu_db'  // Jina la database yako
});

// Angalia kama uunganisho umefanikiwa
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);  // Ikiwa kuna kosa, litajitokeza
    return;
  }
  console.log('Connected to the database!');
});

// Route ya kupata bidhaa zote kutoka kwenye database
app.get('/products', (req, res) => {
  // Query ya kuchukua bidhaa zote
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Error querying the database:', err.message);
      res.status(500).send('Database query failed');
      return;
    }
    res.json(results);  // Rudisha matokeo kama JSON
  });
});

// Route ya kutafuta bidhaa kwa jina na kategoria
app.get('/search', (req, res) => {
  const query = req.query.query;   // Neno la utafutaji
  const category = req.query.category;  // Kategoria ya bidhaa

  let sqlQuery = 'SELECT * FROM products WHERE name LIKE ?';
  let params = [`%${query}%`];

  if (category && category !== 'all') {
    sqlQuery += ' AND category = ?';
    params.push(category);
  }

  // Piga query kwenye database
  db.query(sqlQuery, params, (err, results) => {
    if (err) {
      console.error('Error querying the database:', err.message);
      res.status(500).send('Database query failed');
      return;
    }
    res.json(results);  // Rudisha matokeo kama JSON
  });
});

// Kuwasha server kwenye port 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
