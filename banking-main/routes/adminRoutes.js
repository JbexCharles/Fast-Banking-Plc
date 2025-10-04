const express = require("express");
const router = express.Router();
const { createAdmin, loginAdmin, createUser, getUsers, updateUserBalance } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

// Admin login route
router.post("/login", loginAdmin); // Add the login route here

// Only allow the admin to create new users or get users
router.post("/create-user", authMiddleware, createUser);
router.get("/users", authMiddleware, getUsers);
router.put("/update-balance/:id", authMiddleware, updateUserBalance);

router.post("/create-first-admin", createAdmin); // This route will create the first admin


//this is the route for the admin authentication
router.get("/admin-dashboard", authMiddleware, (req, res) => {
    // Access the admin's ID that was attached by the middleware
    const adminId = req.adminId;
    const adminEmail = req.adminEmail;
  
    res.json({
      message: `Welcome Admin with ID: ${adminId} and Email: ${adminEmail}`,
      adminDetails: { id: adminId, email: adminEmail }
    });
  });


module.exports = router;
