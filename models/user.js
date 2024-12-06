import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define(
    "User",
    {
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
    },
    {
      modelName: "User",
      tableName: "users",
      timestamps: true,
    }
  );
  
User.associate = (models) => {
  };

export default User;