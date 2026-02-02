const express = require('express');
const { getAllUsers, getUserRole } = require('../controllers/userController');
const { authenticate, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Protected routes
router.get('/roles/:userId', authenticate, getUserRole);

// Admin only routes
router.get('/', authenticate, requireAdmin, getAllUsers);

module.exports = router;
