const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const cron = require("node-cron");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database with persistent file
const db = new sqlite3.Database("./leaderboard.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database at ./leaderboard.db");
    // Create leaderboard table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS leaderboard (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        score INTEGER NOT NULL,
        time TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      (err) => {
        if (err) {
          console.error("Error creating leaderboard table:", err.message);
          return;
        }
        // Check if leaderboard table is empty and seed initial data if needed
        db.get(`SELECT COUNT(*) as count FROM leaderboard`, (err, row) => {
          if (err) {
            console.error("Error checking leaderboard table:", err.message);
            return;
          }
          if (row.count === 0) {
            const initialData = [
              { name: "ChiefHustler", email: "chief@example.com", score: 705, time: "45s" },
              { name: "LagosSpeed", email: "lagos@example.com", score: 572, time: "48s" },
              { name: "DanfoKing", email: "danfo@example.com", score: 465, time: "50s" },
              { name: "StreetRunner", email: "street@example.com", score: 350, time: "52s" },
              { name: "HustleQueen", email: "queen@example.com", score: 238, time: "54s" },
            ];
            initialData.forEach(({ name, email, score, time }) => {
              db.run(
                `INSERT INTO leaderboard (name, email, score, time) VALUES (?, ?, ?, ?)`,
                [name, email, score, time],
                (err) => {
                  if (err) console.error("Error seeding leaderboard data:", err.message);
                }
              );
            });
            console.log("Seeded initial leaderboard data");
          }
        });
      }
    );
    // Create subscribers table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS subscribers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      (err) => {
        if (err) {
          console.error("Error creating subscribers table:", err.message);
        }
      }
    );
    // Create admins table if it doesn't exist
    db.run(
      `CREATE TABLE IF NOT EXISTS admins (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )`,
      (err) => {
        if (err) {
          console.error("Error creating admins table:", err.message);
          return;
        }
        // Seed admin credentials
        db.get(`SELECT COUNT(*) as count FROM admins`, (err, row) => {
          if (err) {
            console.error("Error checking admins table:", err.message);
            return;
          }
          if (row.count === 0) {
            db.run(
              `INSERT INTO admins (username, password) VALUES (?, ?)`,
              ["admin", "securepassword123"], // In production, hash the password
              (err) => {
                if (err) console.error("Error seeding admin data:", err.message);
                else console.log("Seeded initial admin data");
              }
            );
          }
        });
      }
    );
  }
});

require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
// Get leaderboard (top 5 scores)
app.get("/api/leaderboard", (req, res) => {
  db.all(
    `SELECT name, email, score, time FROM leaderboard ORDER BY score DESC LIMIT 5`,
    [],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: "Failed to fetch leaderboard" });
        return;
      }
      const leaderboard = rows.map((row, index) => ({
        rank: index + 1,
        name: row.name,
        email: row.email,
        score: row.score,
        time: row.time,
      }));
      res.json(leaderboard);
    }
  );
});

// Submit or update score
app.post("/api/leaderboard", (req, res) => {
  const { name, email, score, time } = req.body;
  if (!name || !email || !score || !time) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: "Invalid email format" });
    return;
  }
  // Check if email already exists
  db.get(`SELECT score FROM leaderboard WHERE email = ?`, [email], (err, row) => {
    if (err) {
      res.status(500).json({ error: "Failed to check existing entry" });
      return;
    }
    if (row) {
      // Email exists, update if new score is higher
      if (score > row.score) {
        db.run(
          `UPDATE leaderboard SET name = ?, score = ?, time = ?, created_at = CURRENT_TIMESTAMP WHERE email = ?`,
          [name, score, time, email],
          (err) => {
            if (err) {
              res.status(500).json({ error: "Failed to update score" });
              return;
            }
            fetchLeaderboard(res);
          }
        );
      } else {
        fetchLeaderboard(res); // Return leaderboard without updating
      }
    } else {
      // Email doesn't exist, insert new entry
      db.run(
        `INSERT INTO leaderboard (name, email, score, time) VALUES (?, ?, ?, ?)`,
        [name, email, score, time],
        (err) => {
          if (err) {
            res.status(500).json({ error: "Failed to submit score" });
            return;
          }
          fetchLeaderboard(res);
        }
      );
    }
  });
});

// Helper function to fetch leaderboard
function fetchLeaderboard(res) {
  db.all(
    `SELECT name, email, score, time FROM leaderboard ORDER BY score DESC LIMIT 5`,
    [],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: "Failed to fetch leaderboard" });
        return;
      }
      const leaderboard = rows.map((row, index) => ({
        rank: index + 1,
        name: row.name,
        email: row.email,
        score: row.score,
        time: row.time,
      }));
      res.json(leaderboard);
    }
  );
}

// Submit contact form
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: "Invalid email format" });
    return;
  }
  try {
    const mailOptions = {
      from: email,
      to: "info@okilointegratedhub.com",
      subject: `Contact Form: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    };
    await transporter.sendMail(mailOptions);
    res.json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// Subscribe to newsletter
app.post("/api/subscribe", (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ error: "Email is required" });
    return;
  }
  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: "Invalid email format" });
    return;
  }
  db.run(
    `INSERT OR IGNORE INTO subscribers (email) VALUES (?)`,
    [email],
    (err) => {
      if (err) {
        console.error("Error adding subscriber:", err.message);
        res.status(500).json({ error: "Failed to subscribe" });
        return;
      }
      res.json({ message: "Subscribed successfully" });
    }
  );
});

// Get subscribers (admin only)
app.get("/api/subscribers", (req, res) => {
  // In production, add authentication middleware
  db.all(`SELECT email, created_at FROM subscribers ORDER BY created_at DESC`, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch subscribers" });
      return;
    }
    res.json(rows);
  });
});

// Admin login
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }
  db.get(`SELECT * FROM admins WHERE username = ? AND password = ?`, [username, password], (err, row) => {
    if (err) {
      res.status(500).json({ error: "Failed to authenticate" });
      return;
    }
    if (row) {
      res.json({ message: "Login successful" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });
});

// Schedule leaderboard reset every Monday at midnight
cron.schedule("0 0 * * 1", () => {
  db.run(`DELETE FROM leaderboard`, (err) => {
    if (err) {
      console.error("Error resetting leaderboard:", err.message);
    } else {
      console.log("Leaderboard reset successfully");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});