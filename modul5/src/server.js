const express = require('express');
const cors = require('cors');
const app = express();
const fs = require('fs');
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DB_FILE = './db.json';

// Load DB
function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

app.get('/chats', (req, res) => {
  res.json(readDB().chats);
});

app.post('/chats', (req, res) => {
  const db = readDB();
  const newChat = { id: Date.now(), ...req.body };
  db.chats.push(newChat);
  writeDB(db);
  res.status(201).json(newChat);
});

app.put('/chats/:id', (req, res) => {
  const db = readDB();
  const chatIndex = db.chats.findIndex(c => c.id == req.params.id);
  if (chatIndex === -1) return res.sendStatus(404);
  db.chats[chatIndex].text = req.body.text;
  writeDB(db);
  res.sendStatus(200);
});

app.delete('/chats/:id', (req, res) => {
  let db = readDB();
  db.chats = db.chats.filter(c => c.id != req.params.id);
  writeDB(db);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
