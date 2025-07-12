const Profile = require('../models/Profile');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

// === Get Profile ===
exports.getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.userId }).populate('user', 'email createdAt');

    if (!profile) {
      profile = new Profile({ user: req.userId });
      await profile.save();
      profile = await profile.populate('user', 'email createdAt');
    }

    res.json(profile);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ msg: 'Error fetching profile' });
  }
};

// === Update Profile ===
// === Update Profile ===
exports.updateProfile = async (req, res) => {
  try {
    const { firstName, lastName, address, phone, bio, currentPassword } = req.body;

    const user = await User.findById(req.userId);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Incorrect password' });

    let profile = await Profile.findOne({ user: req.userId });
    if (!profile) profile = new Profile({ user: req.userId });

    profile.firstName = firstName || profile.firstName;
    profile.lastName = lastName || profile.lastName;
    profile.address = address || profile.address;
    profile.phone = phone || profile.phone;
    profile.bio = bio || profile.bio;

    // === Handle avatar upload ===
    if (req.file) {
      // Delete old avatar if it exists
      if (profile.avatar) {
        const oldPath = path.join(__dirname, '..', 'uploads', profile.avatar);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      profile.avatar = req.file.filename;
    }

    // === Save profile safely ===
    try {
      await profile.save();
    } catch (err) {
      // If saving failed and a file was uploaded, remove it
      if (req.file) {
        const failedPath = path.join(__dirname, '..', 'uploads', req.file.filename);
        if (fs.existsSync(failedPath)) fs.unlinkSync(failedPath);
      }
      throw err;
    }

    // ✅ Populate the user field before sending response
    await profile.populate('user', 'email createdAt');

    res.json(profile);
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};


// === Change Password ===
exports.changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(req.userId);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Incorrect password' });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ msg: 'Password changed' });
  } catch (err) {
    console.error('Error changing password:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// === Change Email ===
exports.changeEmail = async (req, res) => {
  const { newEmail, currentPassword } = req.body;
  try {
    if (!newEmail || !currentPassword) {
      return res.status(400).json({ msg: 'New email and current password are required' });
    }

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Incorrect password' });

    const exists = await User.findOne({ email: newEmail });
    if (exists && exists._id.toString() !== req.userId) {
      return res.status(400).json({ msg: 'Email already in use' });
    }

    user.email = newEmail;
    await user.save();

    res.json({ msg: 'Email changed' });
  } catch (err) {
    console.error('Error changing email:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// === Delete Account ===
exports.deleteAccount = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (user.email !== email) return res.status(400).json({ msg: 'Email mismatch' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Incorrect password' });

    // Delete avatar file if exists
    const profile = await Profile.findOne({ user: req.userId });
    if (profile && profile.avatar) {
      const avatarPath = path.join(__dirname, '..', 'uploads', profile.avatar);
      if (fs.existsSync(avatarPath)) fs.unlinkSync(avatarPath);
    }

    await Profile.deleteOne({ user: req.userId });
    await User.findByIdAndDelete(req.userId);

    res.json({ msg: 'Account deleted' });
  } catch (err) {
    console.error('Error deleting account:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};
