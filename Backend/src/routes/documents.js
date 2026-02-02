const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
    getAllDocuments,
    getDocumentsByCategory,
    uploadDocument,
    downloadDocument,
    deleteDocument,
    incrementDownload,
} = require('../controllers/documentController');
const { authenticate, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Create uploads directory if it doesn't exist
const uploadDir = process.env.UPLOAD_PATH || './uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /pdf|doc|docx|txt/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only document files are allowed (PDF, DOC, DOCX, TXT)'));
        }
    },
});

// Protected routes
router.get('/', authenticate, getAllDocuments);
router.get('/category/:category', authenticate, getDocumentsByCategory);
router.get('/:id/download', authenticate, downloadDocument);
router.post('/:id/download-count', authenticate, incrementDownload);

// Admin only routes
router.post('/', authenticate, requireAdmin, upload.single('file'), uploadDocument);
router.delete('/:id', authenticate, requireAdmin, deleteDocument);

module.exports = router;
