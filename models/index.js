import User from './user.js';
import Transaction from './transaction.js';

const models = {
  User,
  Transaction,
};

// Define associations
User.associate(models);
Transaction.associate(models);

export default models;