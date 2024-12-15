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
