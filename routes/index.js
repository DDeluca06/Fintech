import express from "express";
const router = express.Router();
import User from '../models/user.js';

// Routing
router.get("/", async (req, res) => {
  try {
    const data = await fetchDataFromDatabase();
    res.render("dashboard", { data });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/transactions", async (req, res) => {
  try {
    const transactions = await fetchTransactionsFromDatabase();
    res.render("transactions", { transactions });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Log-In Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body; // Check Email & Password

  try {
      const user = await User.findOne({ where: { email } }); // Check if user exists in database
      if (!user) {
          return res.status(401).send("Invalid credentials. Please try again.");
      } // If user does not exist, return 401.
      const isMatch = await user.comparePassword(password); // Compare password with hashed password in database
      if (isMatch) {
          req.session.isLoggedIn = true; // Set session variable
          res.redirect("/dashboard"); // Redirect to dashboard route
      } else {
          res.status(401).send("Invalid credentials. Please try again."); // Password does not match, GTFOH.
      }
  } catch (error) { // Error handling, might be your fault, might not be.
      console.error("Error during login:", error);
      res.status(500).send("Internal Server Error");
  }
});

// Sign-Up Route
router.post("/signup", async (req, res) => {
  const { first_name, last_name, email, password, balance } = req.body;

  try {
      // Check if a user with the same email already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
          return res.status(409).send("Email already in use. Please use a different email."); // 409 Conflict
      }
      // Create a new user
      const newUser  = await User.create({
          first_name,
          last_name,
          email,
          password_hash: password, // This will be hashed in the model's hooks
          balance: 0
      });
      res.status(201).send("User created successfully.");
  } catch (error) {
      console.error("Error during sign up:", error);
      res.status(500).send("Internal Server Error");
  }
});

router.get('/dashboard', (req, res) => {
  if (req.session.isLoggedIn) {
      res.render('dashboard'); // Render the dashboard.ejs view
  } else {
      res.status(401).send("You must be logged in to view this page.");
      res.redirect('/'); // Redirect to the login page if not logged in
  }
});

// Log Out
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
      if (err) {
          return res.redirect('/dashboard'); // Redirect to dashboard if there's an error
      }
      res.redirect('/'); // Redirect to login page after logout
  });
});

// Check our log-in
router.get('/api/check-login', (req, res) => {
  // Check if the user is logged in
  if (req.session.isLoggedIn) {
      res.json({ isLoggedIn: true });
  } else {
      res.status(401).json({ isLoggedIn: false });
  }
});

export default router;
