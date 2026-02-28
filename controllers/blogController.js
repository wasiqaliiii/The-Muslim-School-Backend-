const db = require("../models/db");

exports.createBlog = async (req, res) => {
  const { title, content, author } = req.body;
  const image_url = req.file ? req.file.path : null;

  await db.query(
    "INSERT INTO blogs (title, content, author, image_url) VALUES (?,?,?,?)",
    [title, content, author, image_url]
  );

  res.json({ message: "Blog created" });
};

exports.getBlogs = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM blogs WHERE is_published=1");
  res.json(rows);
};