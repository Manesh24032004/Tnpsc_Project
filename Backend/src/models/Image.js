const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
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
        url: {
            type: String,
            default: '',
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

const ImageModel = mongoose.model('Image', imageSchema);

module.exports = { ImageModel };
