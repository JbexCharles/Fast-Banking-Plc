const User = require("../models/User");
const Admin = require("../models/Admin")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const adminExists = await Admin.countDocuments();
    
    if (adminExists > 0) {
      return res.status(400).json({ message: "Admin already exists. Only one admin is allowed." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ email, password: hashedPassword });
    
    await admin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, governmentID, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({ name, email, password: hashedPassword, governmentID, address });
    await user.save();
    
    res.json({ message: "User created successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.updateUserBalance = async (req, res) => {
  const { id } = req.params;
  const { balance } = req.body;
  await User.findByIdAndUpdate(id, { balance });
  res.json({ message: "Balance updated" });
};


exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the admin using email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { email: admin.email, id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    

    res.json({
      message: "Admin logged in successfully",
      token,
      admin: {
        email: admin.email,
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
