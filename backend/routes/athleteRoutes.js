const express = require('express');
const router = express.Router();
const {
  createAthlete,
  getAllAthletes,
  getAthleteById,
  updateAthlete,
  deleteAthlete,
  updateAthleteStatus
} = require('../controllers/athleteController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

// Public route for registering
router.post('/', createAthlete);

// Protected routes for Athlete & Admin to view/update profile
router.get('/:id', protect, getAthleteById);
router.put('/:id', protect, updateAthlete);

// Protected routes for Admin only
router.get('/', protect, restrictTo('admin'), getAllAthletes);
router.delete('/:id', protect, restrictTo('admin'), deleteAthlete);
router.put('/:id/status', protect, restrictTo('admin'), updateAthleteStatus);

module.exports = router;
