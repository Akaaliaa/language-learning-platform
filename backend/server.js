const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

const SECRET_KEY = "simple_secret_key";

app.get("/", (req, res) => {
  res.send("Backend is running.");
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  db.run(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, hashedPassword],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({
          message: "User registered successfully",
          userId: this.lastID,
        });
      }
    }
  );
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!user) {
      res.status(400).json({ error: "User not found" });
    } else {
      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) {
        res.status(400).json({ error: "Invalid password" });
      } else {
        const token = jwt.sign({ id: user.id }, SECRET_KEY, {
          expiresIn: "1h",
        });

        res.json({
          message: "Login successful",
          token,
          username: user.username,
        });
      }
    }
  });
});

app.get("/lessons", (req, res) => {
  db.all("SELECT * FROM lessons", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.post("/lessons", (req, res) => {
  const { title, description } = req.body;

  db.run(
    "INSERT INTO lessons (title, description) VALUES (?, ?)",
    [title, description],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({
          id: this.lastID,
          title,
          description,
        });
      }
    }
  );
});

app.get("/vocabulary", (req, res) => {
  db.all("SELECT * FROM vocabulary", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.post("/vocabulary", (req, res) => {
  const { lesson_id, word, meaning } = req.body;

  db.run(
    "INSERT INTO vocabulary (lesson_id, word, meaning) VALUES (?, ?, ?)",
    [lesson_id, word, meaning],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({
          id: this.lastID,
          lesson_id,
          word,
          meaning,
        });
      }
    }
  );
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});