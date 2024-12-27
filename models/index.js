import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js';
import Transaction from './transaction.js';

// Initialize the User model
User.init({
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false,
    },
    first_name: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    sequelize, // Pass the connection instance
    modelName: 'User', // Name of the model
    tableName: 'users', // Name of the table in the database
    timestamps: false, // Disable timestamps if not needed
});

// Initialize the Transaction model
Transaction.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "user_id",
        },
        onDelete: "CASCADE",
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM("withdrawl", "deposit"),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.ENUM("pending", "complete", "denied"),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    credit: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
    }
}, {
    sequelize, // Pass the connection instance
    modelName: 'Transaction', // Name of the model
    tableName: 'transactions', // Name of the table in the database
    timestamps: false, // Disable timestamps if not needed
});

// Create a models object to hold the models
const models = {
    User,
    Transaction,
};

// Define associations
const associateModels = (models) => {
    User.associate(models);
    Transaction.associate(models);
};

// Call the associate function after all models are defined
associateModels(models);

// Export the models
export default models;
