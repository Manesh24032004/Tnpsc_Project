const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Folder name is required'],
            trim: true,
        },
        parentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Folder',
            default: null,
        },
        type: {
            type: String,
            required: [true, 'Type is required'],
            enum: ['document', 'image'],
        },
        description: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Folder = mongoose.model('Folder', folderSchema);

module.exports = { Folder };
