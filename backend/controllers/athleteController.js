const User = require('../models/User');

// @desc    Register a new athlete
// @route   POST /api/athletes
// @access  Public
const createAthlete = async (req, res) => {
  try {
    const { name, email, password, age, sport, contact, aadhar, schoolName } = req.body;

    if (!name || !email || !password || !age || !sport || !contact || !aadhar || !schoolName) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const athlete = new User({
      name,
      email,
      password,
      role: 'athlete',
      age,
      sport,
      contact,
      aadhar,
      schoolName
    });

    const createdAthlete = await athlete.save();
    
    res.status(201).json({
      _id: createdAthlete._id,
      name: createdAthlete.name,
      email: createdAthlete.email,
      role: createdAthlete.role,
      status: createdAthlete.status,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all athletes
// @route   GET /api/athletes
// @access  Private
const getAllAthletes = async (req, res) => {
  try {
    const athletes = await User.find({ role: 'athlete' }).select('-password').sort({ createdAt: -1 });
    res.status(200).json(athletes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get athlete by ID
// @route   GET /api/athletes/:id
// @access  Public (for viewing own reg)
const getAthleteById = async (req, res) => {
  try {
    const athlete = await User.findById(req.params.id).select('-password');
    if (!athlete || athlete.role !== 'athlete') {
      return res.status(404).json({ message: 'Athlete not found' });
    }
    res.status(200).json(athlete);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update athlete profile
// @route   PUT /api/athletes/:id
// @access  Public (athlete updates their info)
const updateAthlete = async (req, res) => {
  try {
    const { name, age, sport, contact, aadhar, schoolName } = req.body;
    
    let athlete = await User.findById(req.params.id);
    
    if (!athlete || athlete.role !== 'athlete') {
      return res.status(404).json({ message: 'Athlete not found' });
    }

    athlete.name = name || athlete.name;
    athlete.age = age || athlete.age;
    athlete.sport = sport || athlete.sport;
    athlete.contact = contact || athlete.contact;
    athlete.aadhar = aadhar || athlete.aadhar;
    athlete.schoolName = schoolName || athlete.schoolName;

    const updatedAthlete = await athlete.save();
    
    // Convert to object and strip password for sending to client
    const returnObj = updatedAthlete.toObject();
    delete returnObj.password;
    
    res.status(200).json(returnObj);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete athlete profile
// @route   DELETE /api/athletes/:id
// @access  Private (Admin only)
const deleteAthlete = async (req, res) => {
  try {
    const athlete = await User.findById(req.params.id);
    
    if (!athlete) {
      return res.status(404).json({ message: 'Athlete not found' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Athlete removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update athlete status (approve/reject)
// @route   PUT /api/athletes/:id/status
// @access  Private (Admin only)
const updateAthleteStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    let athlete = await User.findById(req.params.id);
    
    if (!athlete || athlete.role !== 'athlete') {
      return res.status(404).json({ message: 'Athlete not found' });
    }

    athlete.status = status;
    const updatedAthlete = await athlete.save();
    
    res.status(200).json({
      _id: updatedAthlete._id,
      name: updatedAthlete.name,
      status: updatedAthlete.status,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createAthlete,
  getAllAthletes,
  getAthleteById,
  updateAthlete,
  deleteAthlete,
  updateAthleteStatus
};
