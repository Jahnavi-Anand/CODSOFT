const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // For hashing passwords
const app = express();

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://devops:devops@cluster0.5298ya3.mongodb.net/quizzler?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose Models
const User = mongoose.model('User', {
    username: String,
    email: String,
    createdAt: Date,
    updatedAt: Date
});

const Password = mongoose.model('Password', {
    username: String,
    password: String,
    createdAt: Date,
    updatedAt: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Route to serve static files (CSS, JS, etc.)
app.use(express.static('public'));

// Route to render signup page
app.get("/signup", (req, res) => {
    res.sendFile(__dirname + '/public/signup.html');
});

// Route to handle signup form submission
app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            throw new Error('Username or email already exists');
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user data to User collection
        const newUser = new User({
            username,
            email,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        await newUser.save();

        // Save username and password to Password collection with user reference
        const newPassword = new Password({
            username,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
            user: newUser._id
        });
        await newPassword.save();

        res.status(201).send('Signup successful'); // Respond with success
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).send('Internal Server Error'); // Respond with error
    }
});

// Route to handle login form submission
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username in 'User' collection
        const user = await User.findOne({ username });

        if (!user) {
            throw new Error('User not found');
        }

        // Find hashed password by username in 'Password' collection
        const passwordDoc = await Password.findOne({ username });

        if (!passwordDoc) {
            throw new Error('Password document not found');
        }

        // Verify password (compare hashed password)
        const isPasswordValid = await bcrypt.compare(password, passwordDoc.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        console.log('User logged in successfully');
        res.redirect('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error'); // Respond with error
    }
});

// Route to handle dashboard page
app.get("/dashboard", (req, res) => {
    res.sendFile(__dirname + '/public/dashboard.html');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
