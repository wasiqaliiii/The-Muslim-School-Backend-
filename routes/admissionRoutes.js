const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  submitAdmission,
  getAdmissions,
  updateAdmissionStatus
} = require("../controllers/admissionController");

// Public
router.post("/", upload.single("document"), submitAdmission);

// Admin
router.get("/", getAdmissions);
router.put("/:id", updateAdmissionStatus);

module.exports = router;