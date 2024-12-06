// Starting over! Yippie! I love programming! So much fun!
// Imports, totally haven't done these before
import express from 'express';
import sequelize from './config/database.js';
import routes from './routes/index.js';
import models from './models/index.js'; // This works, somehow.

// App = app, stupid.
const app = express();

// Test the connection, if it we don't get it, let's just crash the whole laptop. Why not, who cares.
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.log('Error connecting to database:', err));
// This feels like it's going to break something. I feel like this is bad.
app.use('/', routes); 

// Syncing
const syncDatabase = async () => {
    try {
      await sequelize.sync({ force: true }); // Use { force: true } to drop existing tables and recreate them
      console.log('Database & tables created!');
    } catch (error) {
      console.error('Error creating database tables:', error);
    }
  };

// Port.
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await syncDatabase(); // Sync on start
  console.log(`Synced!`)
});

export default routes;