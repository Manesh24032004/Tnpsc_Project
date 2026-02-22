const express = require('express');
const {
    getFolders,
    createFolder,
    updateFolder,
    deleteFolder
} = require('../controllers/folderController');
const { authenticate, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Publicly readable? Usually yes for users to see categories
router.get('/', authenticate, getFolders);

// Admin only for management
router.post('/', authenticate, requireAdmin, createFolder);
router.patch('/:id', authenticate, requireAdmin, updateFolder);
router.delete('/:id', authenticate, requireAdmin, deleteFolder);

module.exports = router;
