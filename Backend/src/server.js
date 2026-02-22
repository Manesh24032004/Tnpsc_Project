const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { connectDB } = require('./config/database');
const { User } = require('./models/User');
const { UserRole } = require('./models/UserRole');

// Import routes
const authRoutes = require('./routes/auth');
const documentRoutes = require('./routes/documents');
const userRoutes = require('./routes/users');
const adminRoutes = require('./routes/adminRoutes');
const userContentRoutes = require('./routes/userContent');
const folderRoutes = require('./routes/folders');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors({
    origin: '*', // Allow all origins during development
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'user-id', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user-content', userContentRoutes);
app.use('/api/folders', folderRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ success: true, message: 'TNPSC Backend is running!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Route not found' });
});

// Seed Admin User
const seedAdmin = async () => {
    try {
        const adminEmail = 'maneshkavya2004@gmail.com';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (!existingAdmin) {
            console.log('Seeding admin user...');
            const admin = await User.create({
                email: adminEmail,
                password: 'M@neshkavya2004',
                name: 'Admin'
            });
            await UserRole.create({ userId: admin._id, role: 'admin' });
            console.log('Admin user seeded successfully');
        } else {
            // Reset password to ensure it matches prescribed one
            existingAdmin.password = 'M@neshkavya2004';
            await existingAdmin.save();
            console.log('Admin password reset successfully');

            // Ensure the role is also correct
            const role = await UserRole.findOne({ userId: existingAdmin._id });
            if (!role || role.role !== 'admin') {
                await UserRole.findOneAndUpdate(
                    { userId: existingAdmin._id },
                    { role: 'admin' },
                    { upsert: true }
                );
                console.log('Admin role updated for existing user');
            }
        }
    } catch (error) {
        console.error('Admin seeding error:', error);
    }
};

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    console.log('Connected to MongoDB');
    seedAdmin(); // Call seedAdmin after successful DB connection
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📁 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    });
});
