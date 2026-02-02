const express = require('express');
const {
    getStats,
    getAllUsersWithRoles,
    updateUserRole,
    getAllDocuments,
    deleteDocument,
    getRecentActivity
} = require('../controllers/adminController');
const { authenticate, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(requireAdmin);

// Admin dashboard statistics
router.get('/stats', getStats);

// User management
router.get('/users', getAllUsersWithRoles);
router.put('/users/:userId/role', updateUserRole);

// Document management
router.get('/documents', getAllDocuments);
router.delete('/documents/:documentId', deleteDocument);

// Activity tracking
router.get('/activity', getRecentActivity);

module.exports = router;
