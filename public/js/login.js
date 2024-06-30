document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    let hasError = false;

    // Clear previous error messages
    document.getElementById('usernameError').textContent = '';
    document.getElementById('passwordError').textContent = '';

    // Get form values
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validate username
    if (username === '') {
        document.getElementById('usernameError').textContent = 'Username is required';
        hasError = true;
    }

    // Validate password
    if (password === '') {
        document.getElementById('passwordError').textContent = 'Password is required';
        hasError = true;
    }

    if (!hasError) {
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            alert('Login successful!');
            window.location.href = '/dashboard'; // Redirect to dashboard page after successful login
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Error logging in. Please check your credentials.');
        }
    }
});
