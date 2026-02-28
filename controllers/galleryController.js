const db = require("../models/db");

exports.addGalleryImage = async (req, res) => {
  const { title, description } = req.body;
  const image_url = req.file ? req.file.path : null;

  await db.query(
    "INSERT INTO gallery (title, description, image_url) VALUES (?,?,?)",
    [title, description, image_url]
  );

  res.json({ message: "Image added to gallery" });
};

exports.getGallery = async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM gallery ORDER BY created_at DESC"
  );
  res.json(rows);
};

exports.deleteGalleryImage = async (req, res) => {
  const { id } = req.params;

  await db.query("DELETE FROM gallery WHERE id=?", [id]);

  res.json({ message: "Image deleted" });
};