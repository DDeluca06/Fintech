import express from "express";
const router = express.Router();
import { fetchDataFromDatabase } from '../utils/db.js';
import models from '../models/index.js';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // If you looked at this and went "why is this here??", yeah. Me too. It shouldn't be, but it's the only way this goddamn diabolical thing works.

// Routing
router.get("/", async (req, res) => {
  try {
    // Get index
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Log-In Route
router.post("/login", async (req, res) => {
  console.log("Login request body:", req.body); // Debugging line
  const { email, password } = req.body; // Check Email & Password

  try {
      console.log("Attempting to log in with email:", email); // Debugging line
      const user = await models.User.findOne({ where: { email } }); // Check if user exists in database
      console.log("User Found:", user); // Debugging line
      if (!user) {
          return res.status(401).send("Invalid credentials. Please try again.");
      } // If user does not exist, return 401.
      const isMatch = await user.comparePassword(password); // Compare password with hashed password in database
      if (isMatch) {
          req.session.isLoggedIn = true; // Set session variable
          req.session.userEmail = user.email; // Store user email in session
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
      const existingUser = await models.User.findOne({ where: { email } });
      if (existingUser) {
          return res.status(409).send("Email already in use. Please use a different email."); // 409 Conflict
      }
      // Create a new user
      const newUser  = await models.User.create({
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

router.get('/dashboard', async (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.redirect('/');
  }

  try {
    const user = await models.User.findOne({ where: { email: req.session.userEmail } });
    const transactions = await models.Transaction.findAll({
      where: { user_id: user.user_id },
      order: [['date', 'DESC']],
    });

    const transactionCount = transactions ? transactions.length : 0;

    res.render('dashboard', {
      user: {
        firstName: user.first_name,
        lastName: user.last_name,
        balance: user.balance,
      },
      transactions,
      transactionCount,
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).send('Internal Server Error');
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

/*
=============================================================================
                    TRANSACTION CODE BELOW, IMPORTANT
                              DO NOT TOUCH
=============================================================================
*/

router.post('/transactions', async (req, res) => {
  const { amount, description, transactionType } = req.body;

  // Check if the user is logged in
  if (!req.session.isLoggedIn) {
      return res.status(401).send("Unauthorized, please log in.");
  }

  try {
      const user = await models.User.findOne({ where: { email: req.session.userEmail } });
      let newBalance;

      if (transactionType === 'deposit') {
          newBalance = user.balance + parseFloat(amount);
          // Update user's balance
          await models.User.update({ balance: newBalance }, { where: { email: req.session.userEmail } });

          // Create a new transaction record for depositing
console.log("Creating Transaction:", { user_id: user.user_id, amount, description, transactionType });
await models.Transaction.create({
    user_id: user.user_id,
              type: 'deposit',
              amount: parseFloat(amount),
              status: 'complete',
              description: description || 'Deposit transaction',
              credit: false
          });
      } else if (transactionType === 'withdrawal') {
          if (user.balance < amount) {
              return res.status(400).send("Insufficient funds");
          }
          newBalance = user.balance - parseFloat(amount);
          // Update user's balance
          await models.User.update({ balance: newBalance }, { where: { email: req.session.userEmail } });

          // Create a new transaction record for withdrawing (should these be seperate routes??)
          await models.Transaction.create({
              user_id: user.user_id,
              type: 'withdrawal',
              amount: parseFloat(amount),
              status: 'complete',
              description: description || 'Withdrawal transaction',
              credit: false
          });
      }
      res.redirect('/dashboard'); // Redirect back to the dashboard
  } catch (error) {
      console.error("Error during transaction:", error);
      res.status(500).send("Internal Server Error");
  }
});

// Delete Transaction Route
router.delete('/transactions/:id', async (req, res) => {
  const transactionId = req.params.id;

  // PLEASE, PLEASE CHECK IF THE USER IS LOGGED IN FIRST.
  if (!req.session.isLoggedIn) {
    return res.status(401).send("Unauthorized, please log in.");
  }

    // Find the transaction
  try {
      const transaction = await models.Transaction.findOne({
          where: { id: transactionId }
      });
    // If we can't find it, tell the user to get bent
      if (!transaction) {
          return res.status(404).send("Transaction not found.");
      }
    // Find our user, this might be a good step.
      const user = await models.User.findOne({
          where: { user_id: transaction.user_id }
      });
    // Can't find him! ... Should this be the first thing we do? Oh, who cares.
      if (!user) {
          return res.status(404).send("User not found.");
      }
    // Revert the changes of the transaction as we delete it
      let newBalance;
      if (transaction.type === 'deposit') {
          newBalance = user.balance - transaction.amount; 
      } else if (transaction.type === 'withdrawal') {
          newBalance = user.balance + transaction.amount;
      }

      await models.User.update({ balance: newBalance }, { where: { user_id: user.user_id } });

      await models.Transaction.destroy({
          where: { id: transactionId }
      });

      res.status(204).send();
  } catch (error) {
      console.error("Error deleting transaction:", error);
      res.status(500).send("Internal Server Error");
  }
});

export default router;
