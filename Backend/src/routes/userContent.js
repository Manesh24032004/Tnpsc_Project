const express = require('express');
const {
    getBookmarks,
    addBookmark,
    removeBookmark,
    getChats,
    getChatById,
    saveChat,
    deleteChat
} = require('../controllers/userContentController');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(authenticate);

// Bookmarks
router.get('/bookmarks', getBookmarks);
router.post('/bookmarks', addBookmark);
router.delete('/bookmarks/:documentId', removeBookmark);

// Chats
router.get('/chats', getChats);
router.get('/chats/:id', getChatById);
router.post('/chats', saveChat);
router.delete('/chats/:id', deleteChat);

module.exports = router;
