const { DocumentModel } = require('../models/Document');
const path = require('path');
const fs = require('fs');

// Get all documents or filter by category
const getAllDocuments = async (req, res) => {
    try {
        const { category } = req.query;

        let query = {};
        if (category) {
            query = { category };
        }

        const documents = await DocumentModel.find(query)
            .sort({ createdAt: -1 })
            .populate('uploadedBy', 'name email');

        res.json({
            success: true,
            data: documents,
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Get documents by category
const getDocumentsByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        const documents = await DocumentModel.find({ category })
            .sort({ createdAt: -1 })
            .populate('uploadedBy', 'name email');

        res.json({
            success: true,
            data: documents,
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Upload document
const uploadDocument = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'No file uploaded' });
        }

        const { title, description, category, subcategory } = req.body;

        const document = await DocumentModel.create({
            title,
            description,
            category,
            subcategory,
            filePath: req.file.path,
            fileName: req.file.originalname,
            fileSize: req.file.size,
            pdfUrl: '', // Empty string for future cloud storage
            uploadedBy: req.user?._id,
        });

        res.status(201).json({
            success: true,
            data: document,
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Download document
const downloadDocument = async (req, res) => {
    try {
        const { id } = req.params;

        const document = await DocumentModel.findById(id);

        if (!document) {
            return res.status(404).json({ success: false, error: 'Document not found' });
        }

        // Increment download count
        document.downloadCount += 1;
        await document.save();

        // If pdfUrl exists (cloud storage), redirect to it
        if (document.pdfUrl && document.pdfUrl !== '') {
            return res.json({
                success: true,
                data: {
                    url: document.pdfUrl,
                    fileName: document.fileName,
                },
            });
        }

        // Otherwise, serve the local file
        const filePath = path.resolve(document.filePath);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ success: false, error: 'File not found' });
        }

        res.download(filePath, document.fileName);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Delete document
const deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;

        const document = await DocumentModel.findById(id);

        if (!document) {
            return res.status(404).json({ success: false, error: 'Document not found' });
        }

        // Delete file from disk if it exists
        const filePath = path.resolve(document.filePath);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Delete document from database
        await DocumentModel.findByIdAndDelete(id);

        res.json({
            success: true,
            message: 'Document deleted successfully',
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Increment download count
const incrementDownload = async (req, res) => {
    try {
        const { id } = req.params;

        const document = await DocumentModel.findById(id);

        if (!document) {
            return res.status(404).json({ success: false, error: 'Document not found' });
        }

        document.downloadCount += 1;
        await document.save();

        res.json({
            success: true,
            data: { downloadCount: document.downloadCount },
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

module.exports = {
    getAllDocuments,
    getDocumentsByCategory,
    uploadDocument,
    downloadDocument,
    deleteDocument,
    incrementDownload,
};
