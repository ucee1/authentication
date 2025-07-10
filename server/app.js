import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser';

import 'dotenv/config'


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nekndrjffzkurnkqzskv.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5la25kcmpmZnprdXJua3F6c2t2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNTM5MDAsImV4cCI6MjA2NzcyOTkwMH0.yiXE5Z_N2G99RCpp5ia7zJLIm9bCYNZKD-eQrDkCG1g"
console.log(supabaseKey);
const supabase = createClient(supabaseUrl, supabaseKey)

import { Pool } from "pg";




const app = express();
app.use(cookieParser());

// app.use(cors());
app.use(cors({
  origin: "http://localhost:5173", // ✅ exact origin, no wildcard
  credentials: true               // ✅ allow cookies
}));
app.use(bodyParser.urlencoded({extended: true}))

// database

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Aunthentication",
  password: "coleman",
  port: 5432,
});

// parse application/json
app.use(bodyParser.json())

const port = 4000;

// api route
app.post("/register", async (req, res) => {
  const { name, email, address, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (name, email, address, password) VALUES ($1, $2, $3, $4)",
      [name, email, address, hashedPassword]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});


//login api route
app.post('/submit', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    console.log(result.rows);

    if (result.rows.length === 0) {
      // ❌ No user found
      return res.status(400).json({ error: 'Account does not exist. Please register.' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ email: user.email }, 'secret', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful' });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});




//user route
// app.get("/user", async (req, res) => {
//   const token = req.cookies.token;
//   const decoded = jwt.verify(token, "secret");
//   console.log(decoded);
//   const data = await pool.query("SELECT * FROM users WHERE email = $1", [
//     decoded.email,
//   ]);
//   const { name, email: userEmail, address } = data.rows[0];
//   console.log(name, userEmail, address);

//   res.render("user", { name: name, email: userEmail, address: address });
// });
app.get('/api/user', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Not logged in' });

  const decoded = jwt.verify(token, 'secret');
  pool.query('SELECT name, email, address FROM users WHERE email = $1', [decoded.email])
    .then((result) => res.json(result.rows[0]))
    .catch((err) => res.status(500).json({ error: 'Failed to fetch user' }));
});


// edit route

app.post('/edit-user', async (req, res) => {
  const { name, address, currentPassword, newPassword } = req.body;
  const token = req.cookies.token;
  const decoded = jwt.verify(token, 'secret');

  try {
    const result = await pool.query('SELECT password FROM users WHERE email = $1', [decoded.email]);
    const savedPassword = result.rows[0].password;

    const isMatch = await bcrypt.compare(currentPassword, savedPassword);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    await pool.query(
      'UPDATE users SET name = $1, address = $2, password = $3 WHERE email = $4',
      [name, address, await bcrypt.hash(newPassword || currentPassword, 10), decoded.email]
    );

    res.status(200).json({ message: 'Profile updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});


// delete user

app.post('/delete-user', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    const decoded = jwt.verify(token, 'secret');
    const email = decoded.email;

    // Delete user from the database
    await pool.query('DELETE FROM users WHERE email = $1', [email]);

    // Clear the token cookie
    res.clearCookie('token');

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (err) {
    console.error('Delete user error:', err);
    res.status(500).json({ error: 'Failed to delete account' });
  }
});





let { data: Aunthentication, error } = await supabase
  .from('Aunthentication')
  .select('*')
          console.log(Aunthentication, error);








app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
