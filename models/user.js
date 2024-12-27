import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import bcrypt from 'bcrypt';

class User extends Model {
    // Method to compare password during login
    async comparePassword(password) {
        return await bcrypt.compare(password, this.password_hash);
    }

    // Define associations
    static associate(models) {
        User.hasMany(models.Transaction, {
            foreignKey: 'user_id',
            as: 'transactions',
        });
    }
}

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
    sequelize: sequelize, // Pass the connection instance
    modelName: 'User', // Name of the model
    tableName: 'users', // Name of the table in the database
    timestamps: false, // Disable timestamps if not needed
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10); // Generate a salt
            user.password_hash = await bcrypt.hash(user.password_hash, salt); // Hash the password
        },
        beforeUpdate: async (user) => {
            if (user.changed('password_hash')) {
                const salt = await bcrypt.genSalt(10);
                user.password_hash = await bcrypt.hash(user.password_hash, salt);
            }
        }
    }
});

// Export the User model
export default User;
