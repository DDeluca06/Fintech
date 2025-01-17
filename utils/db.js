import models from '../models/index.js';

// Function to fetch data from the database
async function fetchDataFromDatabase() {
    try {
        const users = await models.User.findAll({
            include: [{
                model: models.Transaction,
                required: false
            }]
        });

        // Format the data as needed for the dashboard
        const data = users.map(user => ({
            userId: user.user_id,
            firstName: user.first_name,
            lastName: user.last_name,
            balance: user.balance,
            transactions: user.Transactions || [] // Ensure correct case
        }));

        return data;
    } catch (error) {
        console.error("Error fetching data from database:", error);
        throw new Error("Database fetch error");
    }
}

// Export the function
export { fetchDataFromDatabase };