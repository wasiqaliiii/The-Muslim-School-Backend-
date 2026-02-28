const db = require("../models/db");

exports.createNotice = async (req, res) => {
  const { title, description, event_date, event_time } = req.body;

  await db.query(
    "INSERT INTO notices (title, description, event_date, event_time) VALUES (?,?,?,?)",
    [title, description, event_date, event_time]
  );

  res.json({ message: "Notice added" });
};

exports.getNotices = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM notices ORDER BY created_at DESC");
  res.json(rows);
};