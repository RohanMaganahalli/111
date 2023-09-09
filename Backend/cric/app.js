const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs'); // Require the EJS template engine
const path=require('path');

const app = express();
const port = process.env.PORT || 3000;

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'cric'
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Set up EJS as the template engine
app.set('\Desktop\Sharpner_R\Backend\cric\views', path.join(__dirname,'\Desktop\Sharpner_R\Backend\cric\views'));
app.set('view engine','ejs');

// Set up body-parser middleware to handle form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve HTML form for inputting player data and searching for players
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Route to insert player data
app.post('/submit', (req, res) => {
  const { name, age, photo_url, birthplace, description, matches, runs, wickets } = req.body;
  const insertQuery = `INSERT INTO new_table (name, age, photo_url, birthplace, description, matches, runs, wickets) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  // Insert data into the MySQL database
  db.query(insertQuery, [name, age, photo_url, birthplace, description, matches, runs, wickets], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data.');
    } else {
      console.log('Data inserted successfully');
      res.send('Data inserted successfully');
    }
  });
});

// Route to search for a player and display their information
app.get('/search', (req, res) => {
  const playerName = req.query.name; // Get the player name from the query string

  // Query the database to find the player
  const searchQuery = 'SELECT * FROM new_table WHERE name = ?';

  db.query(searchQuery, [playerName], (err, results) => {
    if (err) {
      console.error('Error searching for player:', err);
      res.status(500).send('Error searching for player.');
    } else {
      if (results.length > 0) {
        // Player found, render the player.ejs view with player data
        res.render('player', { player: results[0] });
      } else {
        // Player not found
        res.status(404).send('Player not found.');
      }
    }
  });
});

// Listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});