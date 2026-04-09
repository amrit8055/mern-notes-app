const express = require("express");
const cors = require("cors");

console.log("🔥 CLEAN SERVER RUNNING");

const app = express();

app.use(cors());
app.use(express.json());

let notes = [];

// Root route (keeps server active)
app.get("/", (req, res) => {
  res.send("Server is running ✅");
});

// Notes API
app.get("/api/notes", (req, res) => {
  console.log("GET /api/notes hit");
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  const newNote = {
    id: Date.now().toString(),
    title: req.body.title,
    content: req.body.content,
  };
  notes.push(newNote);
  res.json(newNote);
});

app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});