const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('/api/notes', (req, res) => {
  const notes = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8');
  res.json(JSON.parse(notes));
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  const notes = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));

  

  notes.push(newNote);
  fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(notes));
  res.json(newNote);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
