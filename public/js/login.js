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
        const { connectToDatabase } = require('./db'); // Adjust path as necessary

async function login(username, password) {
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');
    const passwdCollection = db.collection('passwd');

    // Find user by username in 'users' collection
    const user = await usersCollection.findOne({ username });

    if (!user) {
        throw new Error('User not found');
    }

    // Find hashed password by username in 'passwd' collection
    const passwdDoc = await passwdCollection.findOne({ username });

    if (!passwdDoc) {
        throw new Error('Password document not found');
    }

    // Verify password (compare hashed password)
    const isPasswordValid = await verifyPassword(password, passwdDoc.password);

    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    console.log('User logged in successfully');
    return user;
}

async function verifyPassword(password, hashedPassword) {
    // Implement password verification using bcrypt or your preferred library
    // Example: return bcrypt.compare(password, hashedPassword);
    return password === hashedPassword; // For illustration, replace with actual verification logic
}

module.exports = { login };
    }
});
