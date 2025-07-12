require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const profileRoutes = require('./routes/ProfileRoutes'); 
const productSearchRoutes = require('./routes/productSearchRoutes');



const app = express();

// === Middleware ===
app.use(cors({
  origin: 'http://localhost:3000',  // ✅ your frontend dev server
  credentials: true
}));
app.use(express.json());

// === Serve uploaded images from /uploads ===
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// === API Routes ===
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/profile', profileRoutes); // ✅ Mount profile routes
app.use('/api/ai-search', productSearchRoutes);



// === Fallback for undefined routes ===
app.use((req, res) => {
  res.status(404).json({ msg: 'Endpoint not found' });
});

// === MongoDB Connection ===
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/authApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
