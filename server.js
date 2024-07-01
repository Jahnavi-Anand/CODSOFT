const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
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

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Should be set to true in production with HTTPS
}));

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

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

const Dashboard = mongoose.model('dashboard', {
    username: String,
    email: String,
    bio: String,
    institution: String,
    educationLevel: String,
    city: String,
    state: String,
    contactInfo: String,
    createdAt: Date,
    updatedAt: Date,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});


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

        // Save initial dashboard data
        const newDashboard = new Dashboard({
            username,
            email,
            createdAt: new Date(),
            updatedAt: new Date(),
            user: newUser._id
        });
        await newDashboard.save();

        res.status(201).send('Signup successful');
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to handle login form submission
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            throw new Error('User not found');
        }

        // Find hashed password by username
        const passwordDoc = await Password.findOne({ username });
        if (!passwordDoc) {
            throw new Error('Password document not found');
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, passwordDoc.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        // Check if dashboard entry exists, create if not
        const existingDashboard = await Dashboard.findOne({ username });
        if (!existingDashboard) {
            const newDashboard = new Dashboard({
                username,
                email: user.email,
                createdAt: new Date(),
                updatedAt: new Date(),
                user: user._id
            });
            await newDashboard.save();
        }

        // Save username in session
        req.session.username = username;
        res.redirect(`/dashboard`);
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Route to handle dashboard page
app.get('/dashboard', async (req, res) => {
    try {
        if (!req.session.username) {
            return res.redirect('/login.html');
        }

        const username = req.session.username;

        // Fetch user data from the dashboard collection
        const dashboardData = await Dashboard.findOne({ username });
        if (!dashboardData) {
            throw new Error('User data not found in dashboard collection');
        }

        res.sendFile(__dirname + '/public/dashboard.html');
    } catch (error) {
        console.error('Error loading dashboard:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to get user dashboard data
app.get("/dashboard-data", async (req, res) => {
    try {
        const { username } = req.session;
        if (!username) {
            return res.status(401).send('Unauthorized');
        }
        
        const dashboard = await Dashboard.findOne({ username });
        if (!dashboard) {
            return res.status(404).send('Dashboard not found');
        }
        res.status(200).json(dashboard);
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Route to update user dashboard data
// Route to update user dashboard data
app.post("/update-dashboard", async (req, res) => {
    try {
        const { username, bio, institution, educationLevel, city, state, contactInfo } = req.body;
        const dashboard = await Dashboard.findOneAndUpdate(
            { username },
            { bio, institution, educationLevel, city, state, contactInfo, updatedAt: new Date() },
            { new: true }
        );
        if (!dashboard) {
            return res.status(404).send('Dashboard not found');
        }
        res.status(200).json(dashboard);
    } catch (error) {
        console.error('Error updating dashboard data:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Route to handle password update
app.post('/update-password', async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const username = req.session.username; // Assuming username is stored in session after login

        // Find the user and password document
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const passwordRecord = await Password.findOne({ user: user._id });
        const isMatch = await bcrypt.compare(currentPassword, passwordRecord.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Hash the new password and update the password record
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        passwordRecord.password = hashedNewPassword;
        await passwordRecord.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
