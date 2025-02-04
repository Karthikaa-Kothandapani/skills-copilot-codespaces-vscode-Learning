// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

// Create web server
const app = express();
app.use(bodyParser.json());

// Read comments from file
const comments = JSON.parse(fs.readFileSync('comments.json'));

// Get comments
app.get('/api/comments', (req, res) => {
  res.send(comments);
});

// Add comment
app.post('/api/comments', (req, res) => {
  const comment = {
    id: comments.length + 1,
    name: req.body.name,
    message: req.body.message
  };
  comments.push(comment);
  fs.writeFileSync('comments.json', JSON.stringify(comments, null, '  '));
  res.send(comment);
});

// Start web server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});