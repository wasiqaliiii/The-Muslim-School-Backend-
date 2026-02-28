const db = require("../models/db");
const { createObjectCsvWriter } = require("csv-writer");

// SUBMIT CONTACT / PARTNER
exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, message, type } = req.body;

    await db.query(
      "INSERT INTO contacts (name, email, phone, message, type) VALUES (?,?,?,?,?)",
      [name, email, phone, message, type || "contact"]
    );

    res.json({ message: "Submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL CONTACTS (Admin)
exports.getContacts = async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM contacts ORDER BY created_at DESC"
  );
  res.json(rows);
};

// DOWNLOAD CSV
exports.downloadContactsCSV = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM contacts");

  const csvWriter = createObjectCsvWriter({
    path: "contacts.csv",
    header: [
      { id: "name", title: "Name" },
      { id: "email", title: "Email" },
      { id: "phone", title: "Phone" },
      { id: "message", title: "Message" },
      { id: "type", title: "Type" }
    ]
  });

  await csvWriter.writeRecords(rows);
  res.download("contacts.csv");
};