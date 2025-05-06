// Import required modules
const User = require('../models/authmodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Use secret key from environment variable OR fallback
const SECRET_KEY = process.env.SECRET_KEY || 'Mdshah@1000';

// ===== Register User =====
const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if user already exists
        const userExist = await User.findOne({ username });
        if (userExist) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save the new user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating user', error: err.message });
    }
};

// ===== Login User =====
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, username: user.username }, // payload
            SECRET_KEY,                                 // secret key
            { expiresIn: '1h' }                         // token expiry
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Login failed', error: err.message });
    }
};

// Export functions
module.exports = { register, login };
