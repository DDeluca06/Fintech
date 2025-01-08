import User from './user.js';
import Transaction from './transaction.js';

// Define associations
User.hasMany(Transaction, { foreignKey: 'user_id' });
Transaction.belongsTo(User, { foreignKey: 'user_id' });

const models = {
  User,
  Transaction,
};

export default models;