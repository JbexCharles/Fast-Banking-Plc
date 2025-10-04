const User = require("../models/User");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  // Find user by email
  const user = await User.findOne({ email });
  
  // If no user found, return error
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  // Compare entered password with the hashed password in the database
  const isMatch = await bcrypt.compare(password, user.password);
  
  // If passwords don't match, return error
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  // Include user data along with balance in the response
  res.json({
    message: `Welcome, ${user.name}`,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      balance: user.balance, // Include balance in the response
    },
  });
};


exports.transferMoney = async (req, res) => {
    try {
        const { accountName, accountNumber, bank, amount, senderEmail } = req.body;

        if (!accountName || !accountNumber || !bank || !amount || !senderEmail) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (amount <= 0) {
            return res.status(400).json({ message: "Invalid transfer amount" });
        }

        // Find sender in the database
        const sender = await User.findOne({ email: senderEmail });
        if (!sender) {
            return res.status(404).json({ message: "Sender not found" });
        }

        // Check sender's balance
        if (sender.balance < amount) {
            return res.status(400).json({ message: "Insufficient funds" });
        }

        // Deduct amount from sender's balance
        sender.balance -= amount;
        await sender.save();

        return res.json({
            message: "Transfer successful",
            senderBalance: sender.balance, // Ensure correct balance key
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
