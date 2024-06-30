document.getElementById('loginForm').addEventListener('submit', function(event) {
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
        alert('Login successful!');
        // Here you can add code to submit the form data to the server
    }
});
