const db = require("../models/db");

exports.checkBruteForce = async (req, res, next) => {
  const ip = req.ip;

  const [rows] = await db.query(
    "SELECT * FROM login_attempts WHERE ip_address=?",
    [ip]
  );

  if (rows.length && rows[0].blocked_until > new Date()) {
    return res.status(429).json({ message: "Too many attempts. Try later." });
  }

  next();
};

exports.recordFailedAttempt = async (ip) => {
  await db.query(
    `INSERT INTO login_attempts (ip_address, attempts)
     VALUES (?,1)
     ON DUPLICATE KEY UPDATE attempts = attempts + 1`,
    [ip]
  );
};