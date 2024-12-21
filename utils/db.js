import Transaction from '../models/transaction.js';
import User from '../models/user.js';

// Function to fetch data from the database
async function fetchDataFromDatabase() {
    try {
        const users = await User.findAll({
            include: [{
                model: Transaction,
                as: 'transactions',
                required: false
            }]
        });

        // Format the data as needed for the dashboard
        const data = users.map(user => ({
            userId: user.user_id,
            firstName: user.first_name,
            lastName: user.last_name,
            balance: user.balance,
            transactions: user.transactions || []
        }));

        return data;
    } catch (error) {
        console.error("Error fetching data from database:", error);
        throw new Error("Database fetch error");
    }
}

// Export, dummy. That one's important, dontcha think?
export { fetchDataFromDatabase };