const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
  getAllPayments,
  getMyPayments,
  generateMonthlyPayments,
  uploadPaymentProof,
  verifyPayment
} = require('../controllers/paymentController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, 'payment-' + Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({ storage: storage });

// Routes for Athlete
router.get('/my-payments', protect, getMyPayments);
router.put('/:id/upload', protect, restrictTo('athlete'), upload.single('screenshot'), uploadPaymentProof);

// Routes for Admin
router.get('/', protect, restrictTo('admin'), getAllPayments);
router.post('/generate', protect, restrictTo('admin'), generateMonthlyPayments);
router.put('/:id/verify', protect, restrictTo('admin'), verifyPayment);

module.exports = router;
