const express = require("express");
const router = express.Router();
const { loginUser, transferMoney } = require("../controllers/userController");

router.post("/login", loginUser);
router.post("/transfer", transferMoney);

module.exports = router;
