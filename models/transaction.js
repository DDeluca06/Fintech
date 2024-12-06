import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './user.js';

const Transaction = sequelize.define(
  "Transaction",
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
      type: DataTypes.ENUM("credit", "debit"),
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
  },
  {
    modelName: "Transaction",
    tableName: "transactions",
    timestamps: true,
  }
);

Transaction.associate = (models) => {
  Transaction.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user',
  });
};

export default Transaction;

// import { DataTypes } from 'sequelize';
// import sequelize from '../config/database.js';
// import user from './user.js';

// const Transactions = sequelize.define(
//     "Transactions",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       user_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: user, // Use the imported User model
//           key: "id",
//         },
//         onDelete: "CASCADE", // Foreign key constraint
//       },
//       amount: {
//         type: DataTypes.DECIMAL(10, 2),
//         allowNull: false,
//       },
//       transaction_type: {
//         type: DataTypes.ENUM("credit", "debit"),
//         allowNull: false,
//       },
//       transaction_date: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW,
//       },
//       transaction_status: {
//         type: DataTypes.ENUM("pending", "complete", "denied"),
//         allowNull: false,
//       },
//       description: {
//         type: DataTypes.STRING(255),
//         allowNull: true,
//       },
//     },
//     {
//       modelName: "Transactions",
//       tableName: "transactions",
//       timestamps: true,
//     }
//   );
  
// Transactions.associate = (models) => {
//   Transactions.belongsTo(models.User, { // Use the imported User model
//     foreignKey: 'userId',
//     as: 'user',
//   });
// };

// export default Transactions;