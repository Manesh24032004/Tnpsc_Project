const { Folder } = require('../models/Folder');

// Get all folders
const getFolders = async (req, res) => {
    try {
        const folders = await Folder.find().sort({ name: 1 });
        res.json({ success: true, data: folders });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Create a new folder
const createFolder = async (req, res) => {
    try {
        const { name, parentId, type, description } = req.body;
        const folder = await Folder.create({
            name,
            parentId: parentId || null,
            type,
            description
        });
        res.status(201).json({ success: true, data: folder });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update a folder
const updateFolder = async (req, res) => {
    try {
        const { id } = req.params;
        const folder = await Folder.findByIdAndUpdate(id, req.body, { new: true });
        if (!folder) return res.status(404).json({ success: false, error: 'Folder not found' });
        res.json({ success: true, data: folder });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete a folder
const deleteFolder = async (req, res) => {
    try {
        const { id } = req.params;
        await Folder.findByIdAndDelete(id);
        res.json({ success: true, message: 'Folder deleted' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getFolders,
    createFolder,
    updateFolder,
    deleteFolder
};
