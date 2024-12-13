// Starting over! Yippie! I love programming! So much fun!
// Imports, totally haven't done these before
import express from "express";
import session from 'express-session';
import sequelize from "./config/database.js";
import routes from "./routes/index.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Most app.use statements will be here, just for ease.
const app = express();
/* Session Middleware */
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));
/* End of Session Middleware */
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // We could be getting JSON at some point, the app needs to know what to do with it.
app.use(express.static("public")); // Serve public files
app.set("view engine", "ejs"); // Set view engine to EJS
app.set("views", path.join(__dirname, "views"));
app.use("/", routes);
app.use("/api", routes);
// Test the connection, if it we don't get it, let's just crash the whole laptop. Why not, who cares.
sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error connecting to database:", err));

// Syncing
const syncDatabase = async () => {
  try {
    await sequelize.sync(); // Use { force: true } to drop existing tables and recreate them
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Error creating database tables:", error);
  }
};

// Port.
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await syncDatabase(); // Sync on start
  console.log(`Synced!`);
});

export default routes;
