const { User } = require('../models/User');
const { UserRole } = require('../models/UserRole');

// Get all users (admin only)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');

        res.json({
            success: true,
            data: users,
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get user role
const getUserRole = async (req, res) => {
    try {
        const { userId } = req.params;

        const userRole = await UserRole.findOne({ userId });

        if (!userRole) {
            return res.status(404).json({ success: false, error: 'User role not found' });
        }

        res.json({
            success: true,
            data: userRole,
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

module.exports = { getAllUsers, getUserRole };
