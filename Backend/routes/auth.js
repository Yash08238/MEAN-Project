const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const User = require('../models/User'); 

// REGISTER ROUTE
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 2. Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create and Save User
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User Registered Successfully" });

  } catch (err) {
    console.error(err); // Show error in terminal
    res.status(500).json({ message: "Server Error: " + err.message });
  }
});

// LOGIN ROUTE
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find User
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // 2. Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Password" });

    // 3. Generate Token
    const token = jwt.sign({ id: user._id }, 'secretkey');
    res.json({ token, message: "Login Success", user: { name: user.name } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error: " + err.message });
  }
});

module.exports = router;