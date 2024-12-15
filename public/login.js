// Show login modal
function showLogin() {
    document.getElementById('loginModal').style.display = 'block';
}

// Close login modal
function closeLogin() {
    document.getElementById('loginModal').style.display = 'none';
}

// Handle login form submission
async function handleLogin(event) {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    try {
        const response = await fetch('/login', { // POST request to the login route
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }) // Sending email and password as JSON
        });

        if (response.ok) {
            alert('Login successful!');
            window.location.href = '/dashboard'; // Redirect to dashboard route
        } else {
            const errorMessage = await response.text();
            alert(`Login failed: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again.');
    }
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target === modal) {
        closeLogin();
    }
}