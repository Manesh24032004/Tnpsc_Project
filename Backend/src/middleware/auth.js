const { User } = require('../models/User');
const { UserRole } = require('../models/UserRole');

// Simple authentication - just check if userId is provided
const authenticate = async (req, res, next) => {
    try {
        const userId = req.headers['user-id'];

        if (!userId) {
            return res.status(401).json({ success: false, error: 'User ID required' });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ success: false, error: 'User not found' });
        }

        req.user = {
            _id: user._id.toString(),
            email: user.email,
            name: user.name,
        };

        next();
    } catch (error) {
        return res.status(401).json({ success: false, error: 'Invalid user ID' });
    }
};

// Check if user is admin
const requireAdmin = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, error: 'Not authenticated' });
        }

        const userRole = await UserRole.findOne({ userId: req.user._id });

        if (!userRole || userRole.role !== 'admin') {
            return res.status(403).json({ success: false, error: 'Admin access required' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Server error' });
    }
};

module.exports = { authenticate, requireAdmin };
