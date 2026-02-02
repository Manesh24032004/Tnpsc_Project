const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            enum: ['syllabus', 'previous-papers', 'notes', 'books', 'tirukural', 'tamil-scholars'],
        },
        subcategory: {
            type: String,
            trim: true,
        },
        filePath: {
            type: String,
            required: [true, 'File path is required'],
        },
        fileName: {
            type: String,
            required: [true, 'File name is required'],
        },
        fileSize: {
            type: Number,
        },
        pdfUrl: {
            type: String,
            default: '', // Empty string for future cloud storage URL
        },
        downloadCount: {
            type: Number,
            default: 0,
        },
        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

const DocumentModel = mongoose.model('Document', documentSchema);

module.exports = { DocumentModel };
