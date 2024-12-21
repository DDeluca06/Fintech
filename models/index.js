import User from './user.js';
import Transaction from './transaction.js';

const models = {
    User,
    Transaction,
};

// Define associations
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

export { User, Transaction };
export default models;

