const { User } = require('../models/User');
const { UserRole } = require('../models/UserRole');

// Register new user
const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: 'Email already registered' });
        }

        // Create user
        const user = await User.create({ email, password, name });

        // Create default user role
        await UserRole.create({ userId: user._id, role: 'user' });

        res.status(201).json({
            success: true,
            data: {
                user: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                },
            },
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user with password field
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, error: 'Invalid email or password' });
        }

        res.json({
            success: true,
            data: {
                user: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                },
            },
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get current user
const getCurrentUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, error: 'Not authenticated' });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        res.json({
            success: true,
            data: {
                _id: user._id,
                email: user.email,
                name: user.name,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

module.exports = { register, login, getCurrentUser };
