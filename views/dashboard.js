// Check if the user is logged in
async function checkLogin() {
    try {
        const response = await fetch('/api/check-login'); // Fetch login status from the server
        if (!response.ok) {
            throw new Error('Not logged in');
        }
        const data = await response.json();
        if (data.isLoggedIn) {
            loadDashboard(); // Load dashboard data if logged in
        } else {
            alert('You must be logged in to view this page.');
            window.location.href = 'index.html'; // Redirect to login page
        }
    } catch (error) {
        alert('You must be logged in to view this page.');
        window.location.href = 'index.html'; // Redirect to login page
    }
}

// Load dashboard data
function loadDashboard() {
    // Simulate fetching analytics data
    const analyticsData = 'Total Transactions: $10,000 | Total Expenses: $5,000 | Total Income: $15,000';
    document.getElementById('analyticsData').innerText = analyticsData;

    // Simulate fetching transaction list
    const transactions = [
        'Transaction 1: $100',
        'Transaction 2: $200',
        'Transaction 3: $300'
    ];
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = transactions.map(tx => `<li>${tx}</li>`).join('');
}

// Call checkLogin on page load
window.onload = checkLogin;