const { User } = require('../models/User');
const { UserRole } = require('../models/UserRole');
const { DocumentModel } = require('../models/Document');

/**
 * Get admin dashboard statistics
 */
const getStats = async (req, res) => {
    try {
        // Get total counts
        const totalUsers = await User.countDocuments();
        const totalDocuments = await DocumentModel.countDocuments();

        // Get role counts
        const adminCount = await UserRole.countDocuments({ role: 'admin' });
        const userCount = await UserRole.countDocuments({ role: 'user' });

        // Get document stats by category
        // Get document stats by category (case-insensitive checks)
        const syllabusCount = await DocumentModel.countDocuments({ category: { $regex: /^syllabus$/i } });
        const booksCount = await DocumentModel.countDocuments({ category: { $regex: /^school books$|^books$/i } });
        const papersCount = await DocumentModel.countDocuments({ category: { $regex: /^previous papers$|^previous-papers$/i } });
        const notesCount = await DocumentModel.countDocuments({ category: { $regex: /^study notes$|^notes$/i } });
        const tirukuralCount = await DocumentModel.countDocuments({ category: { $regex: /^tirukural$/i } });
        const tamilScholarsCount = await DocumentModel.countDocuments({ category: { $regex: /^tamil scholars$|^tamil-scholars$/i } });

        // Calculate total downloads
        const downloadStats = await DocumentModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalDownloads: { $sum: '$downloadCount' },
                    syllabusDownloads: { $sum: { $cond: [{ $regexMatch: { input: '$category', regex: /^syllabus$/i } }, '$downloadCount', 0] } },
                    booksDownloads: { $sum: { $cond: [{ $regexMatch: { input: '$category', regex: /^school books$|^books$/i } }, '$downloadCount', 0] } },
                    papersDownloads: { $sum: { $cond: [{ $regexMatch: { input: '$category', regex: /^previous papers$|^previous-papers$/i } }, '$downloadCount', 0] } },
                    notesDownloads: { $sum: { $cond: [{ $regexMatch: { input: '$category', regex: /^study notes$|^notes$/i } }, '$downloadCount', 0] } },
                    tirukuralDownloads: { $sum: { $cond: [{ $regexMatch: { input: '$category', regex: /^tirukural$/i } }, '$downloadCount', 0] } },
                    tamilScholarsDownloads: { $sum: { $cond: [{ $regexMatch: { input: '$category', regex: /^tamil scholars$|^tamil-scholars$/i } }, '$downloadCount', 0] } }
                }
            }
        ]);

        const downloads = downloadStats[0] || {
            totalDownloads: 0,
            syllabusDownloads: 0,
            booksDownloads: 0,
            papersDownloads: 0,
            notesDownloads: 0,
            tirukuralDownloads: 0,
            tamilScholarsDownloads: 0
        };

        res.json({
            success: true,
            data: {
                totalUsers,
                totalDocuments,
                totalUploads: totalDocuments,
                totalVisitors: totalUsers * 6, // Estimated metric
                adminCount,
                userCount,
                totalDownloads: downloads.totalDownloads,
                syllabusDownloads: downloads.syllabusDownloads,
                booksDownloads: downloads.booksDownloads,
                papersDownloads: downloads.papersDownloads,
                notesDownloads: downloads.notesDownloads,
                tirukuralDownloads: downloads.tirukuralDownloads,
                tamilScholarsDownloads: downloads.tamilScholarsDownloads,
                categoryCount: {
                    syllabus: syllabusCount,
                    books: booksCount,
                    papers: papersCount,
                    notes: notesCount,
                    tirukural: tirukuralCount,
                    tamilScholars: tamilScholarsCount
                }
            }
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Get all users with their roles
 */
const getAllUsersWithRoles = async (req, res) => {
    try {
        const users = await User.find().select('-password').lean();

        // Get roles for all users
        const userIds = users.map(u => u._id);
        const roles = await UserRole.find({ userId: { $in: userIds } }).lean();

        // Create a map of userId to role
        const roleMap = {};
        roles.forEach(r => {
            roleMap[r.userId.toString()] = r.role;
        });

        // Combine user data with roles
        const usersWithRoles = users.map(user => ({
            ...user,
            role: roleMap[user._id.toString()] || 'user',
            _id: user._id.toString()
        }));

        res.json({
            success: true,
            data: usersWithRoles
        });
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Update user role (promote/demote admin)
 */
const updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;

        // Validate role
        if (!['admin', 'user'].includes(role)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid role. Must be "admin" or "user"'
            });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Update or create user role
        const userRole = await UserRole.findOneAndUpdate(
            { userId },
            { role },
            { new: true, upsert: true }
        );

        res.json({
            success: true,
            data: {
                userId,
                role: userRole.role,
                message: `User role updated to ${role}`
            }
        });
    } catch (error) {
        console.error('Update user role error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Get all documents with metadata
 */
const getAllDocuments = async (req, res) => {
    try {
        const documents = await DocumentModel.find()
            .sort({ createdAt: -1 })
            .lean();

        res.json({
            success: true,
            data: documents
        });
    } catch (error) {
        console.error('Get all documents error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Delete a document
 */
const deleteDocument = async (req, res) => {
    try {
        const { documentId } = req.params;

        const document = await DocumentModel.findById(documentId);
        if (!document) {
            return res.status(404).json({ success: false, error: 'Document not found' });
        }

        // Delete the document from database
        await DocumentModel.findByIdAndDelete(documentId);

        // Note: File deletion from filesystem can be added here if needed
        // const fs = require('fs');
        // if (document.filePath && fs.existsSync(document.filePath)) {
        //     fs.unlinkSync(document.filePath);
        // }

        res.json({
            success: true,
            message: 'Document deleted successfully',
            data: { documentId }
        });
    } catch (error) {
        console.error('Delete document error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

/**
 * Get recent activity (demo data for now)
 */
const getRecentActivity = async (req, res) => {
    try {
        // Get recent users
        const recentUsers = await User.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('name email createdAt')
            .lean();

        // Get recent documents
        const recentDocs = await DocumentModel.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('title category createdAt')
            .lean();

        const activity = [
            ...recentUsers.map(u => ({
                type: 'user_registered',
                user: u.name,
                action: 'registered',
                timestamp: u.createdAt
            })),
            ...recentDocs.map(d => ({
                type: 'document_uploaded',
                user: 'Admin',
                action: `uploaded ${d.title}`,
                timestamp: d.createdAt
            }))
        ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 10);

        res.json({
            success: true,
            data: activity
        });
    } catch (error) {
        console.error('Get recent activity error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = {
    getStats,
    getAllUsersWithRoles,
    updateUserRole,
    getAllDocuments,
    deleteDocument,
    getRecentActivity
};
