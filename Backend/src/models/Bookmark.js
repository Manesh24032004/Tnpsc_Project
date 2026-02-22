const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        documentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Document',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Ensure a user can't bookmark the same document twice
bookmarkSchema.index({ userId: 1, documentId: 1 }, { unique: true });

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = { Bookmark };
