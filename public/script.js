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
    const username = event.target[0].value;
    const password = event.target[1].value;

    try {
        const response = await fetch('/login', { // POST request to the login route
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }) // Sending username and password as JSON
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

// Show sign-up modal
function showSignup() {
    document.getElementById('signupModal').style.display = 'block';
}

// Close sign-up modal
function closeSignup() {
    document.getElementById('signupModal').style.display = 'none';
}

// Handle sign-up form submission
async function handleSignup(event) {
    event.preventDefault();
    const firstName = event.target.first_name.value;
    const lastName = event.target.last_name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password })
        });
        if (!email) {
            return res.status(400).send('Email is required');
        }
        if (response.ok) {
            alert('Sign Up successful! Please log in.');
            closeSignup(); // Close the modal
        } else {
            const errorMessage = await response.text();
            alert(`Sign Up failed: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error during sign up:', error);
        alert('An error occurred. Please try again.');
    }
}