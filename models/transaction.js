import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js'; // Import to complete keys

class Transaction extends Model {}

// Creating the table
Transaction.init(
  {
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
  },
  {
    sequelize: sequelize,
    modelName: "Transaction",
    tableName: "transactions",
    timestamps: true,
  }
);

// Export the Transaction model
export default Transaction;
