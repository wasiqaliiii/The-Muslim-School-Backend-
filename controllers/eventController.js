const db = require("../models/db");

// CREATE EVENT
exports.createEvent = async (req, res) => {
  try {
    const { title, description, event_date } = req.body;
    const media_url = req.file ? req.file.path : null;

    await db.query(
      "INSERT INTO events (title, description, event_date, media_url) VALUES (?,?,?,?)",
      [title, description, event_date, media_url]
    );

    res.json({ message: "Event created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL EVENTS
exports.getEvents = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM events ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE EVENT
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, event_date } = req.body;
    const media_url = req.file ? req.file.path : null;

    await db.query(
      "UPDATE events SET title=?, description=?, event_date=?, media_url=COALESCE(?, media_url) WHERE id=?",
      [title, description, event_date, media_url, id]
    );

    res.json({ message: "Event updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE EVENT
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM events WHERE id=?", [id]);

    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};