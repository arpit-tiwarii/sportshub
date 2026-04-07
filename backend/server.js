const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const athleteRoutes = require('./routes/athleteRoutes');
const authRoutes = require('./routes/authRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
const corsOptions = {
  origin: 'https://statuesque-tarsier-540efd.netlify.app/',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Set static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/athletes', athleteRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/payments', paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
