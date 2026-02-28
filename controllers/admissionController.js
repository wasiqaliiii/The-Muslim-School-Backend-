const db = require("../models/db");

// SUBMIT ADMISSION
exports.submitAdmission = async (req, res) => {
  try {
    const { student_name, parent_name, dob, class_applied } = req.body;
    const document_url = req.file ? req.file.path : null;

    await db.query(
      `INSERT INTO admissions 
       (student_name, parent_name, dob, class_applied, document_url)
       VALUES (?,?,?,?,?)`,
      [student_name, parent_name, dob, class_applied, document_url]
    );

    res.json({ message: "Admission submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL
exports.getAdmissions = async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM admissions ORDER BY created_at DESC"
  );
  res.json(rows);
};

// UPDATE STATUS
exports.updateAdmissionStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  await db.query(
    "UPDATE admissions SET status=? WHERE id=?",
    [status, id]
  );

  res.json({ message: "Status updated" });
};