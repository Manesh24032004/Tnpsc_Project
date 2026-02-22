const { Bookmark } = require('../models/Bookmark');
const { Chat } = require('../models/Chat');
const { DocumentModel } = require('../models/Document');

/**
 * BOOKMARKS
 */

// Get all bookmarks for a user
const getBookmarks = async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({ userId: req.user._id })
            .populate('documentId')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: bookmarks.map(b => b.documentId).filter(d => d !== null)
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Add a bookmark
const addBookmark = async (req, res) => {
    try {
        const { documentId } = req.body;

        const existing = await Bookmark.findOne({ userId: req.user._id, documentId });
        if (existing) {
            return res.status(400).json({ success: false, error: 'Document already bookmarked' });
        }

        const bookmark = await Bookmark.create({
            userId: req.user._id,
            documentId
        });

        res.status(201).json({ success: true, data: bookmark });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Remove a bookmark
const removeBookmark = async (req, res) => {
    try {
        const { documentId } = req.params;
        await Bookmark.findOneAndDelete({ userId: req.user._id, documentId });
        res.json({ success: true, message: 'Bookmark removed' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * CHATS
 */

// Get all chats for a user
const getChats = async (req, res) => {
    try {
        const chats = await Chat.find({ userId: req.user._id })
            .sort({ updatedAt: -1 });
        res.json({ success: true, data: chats });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get a specific chat
const getChatById = async (req, res) => {
    try {
        const chat = await Chat.findOne({ _id: req.params.id, userId: req.user._id });
        if (!chat) {
            return res.status(404).json({ success: false, error: 'Chat not found' });
        }
        res.json({ success: true, data: chat });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Create or update a chat
const saveChat = async (req, res) => {
    try {
        const { id, title, messages } = req.body;

        let chat;
        if (id) {
            chat = await Chat.findOneAndUpdate(
                { _id: id, userId: req.user._id },
                { title, messages },
                { new: true }
            );
        } else {
            chat = await Chat.create({
                userId: req.user._id,
                title,
                messages
            });
        }

        res.json({ success: true, data: chat });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete a chat
const deleteChat = async (req, res) => {
    try {
        await Chat.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        res.json({ success: true, message: 'Chat deleted' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getBookmarks,
    addBookmark,
    removeBookmark,
    getChats,
    getChatById,
    saveChat,
    deleteChat
};
