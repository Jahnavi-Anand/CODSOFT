document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let hasError = false;

    // Clear previous error messages
    document.getElementById('usernameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('confirmPasswordError').textContent = '';

    // Get form values
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    // Validate username
    if (username === '') {
        document.getElementById('usernameError').textContent = 'Username is required';
        hasError = true;
    }

    // Validate email
    if (email === '') {
        document.getElementById('emailError').textContent = 'Email is required';
        hasError = true;
    } else if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Invalid email format';
        hasError = true;
    }

    // Validate password
    if (password === '') {
        document.getElementById('passwordError').textContent = 'Password is required';
        hasError = true;
    }

    // Validate confirm password
    if (confirmPassword === '') {
        document.getElementById('confirmPasswordError').textContent = 'Confirm password is required';
        hasError = true;
    } else if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match';
        hasError = true;
    }

    if (!hasError) {
        alert('Signup successful!');
        const { connectToDatabase } = require('./db'); // Adjust path as necessary

async function signup(username, email, password) {
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');
    const passwdCollection = db.collection('passwd');

    // Hash the password (use bcrypt or another hashing library)
    const hashedPassword = await hashPassword(password);

    // Insert user data into 'users' collection
    const userDoc = {
        username,
        email,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    await usersCollection.insertOne(userDoc);

    // Insert password into 'passwd' collection
    const passwordDoc = {
        username,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    await passwdCollection.insertOne(passwordDoc);

    console.log('User signed up successfully');
}

async function hashPassword(password) {
    // Implement password hashing using bcrypt or your preferred library
    // Example: return bcrypt.hash(password, 10);
    return password; // For illustration, replace with actual hashing logic
}

module.exports = { signup };

    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
