// Importing our module stuff, make the application do application things.
import { Sequelize } from "sequelize";
import 'dotenv/config';

// Signing login details
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
);

console.log("Database Connection Status:", true)

export default sequelize;