const express = require("express");
const jwt = require("jsonwebtoken");
const { checkBruteForce, recordFailedAttempt } = require("../middleware/bruteForce");

const router = express.Router();

router.post("/login", checkBruteForce, async (req, res) => {
  const { email, password } = req.body;

  const allowedAdmins = process.env.ADMIN_EMAILS.split(",");

  const isValidAdmin = allowedAdmins.includes(email);

  if (!isValidAdmin || password !== process.env.ADMIN_PASSWORD) {
    await recordFailedAttempt(req.ip);
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { email, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.json({ message: "Login successful", token });
});

module.exports = router;