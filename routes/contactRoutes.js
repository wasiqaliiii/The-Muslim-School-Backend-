const express = require("express");
const router = express.Router();
const {
  submitContact,
  getContacts,
  downloadContactsCSV
} = require("../controllers/contactController");

// Public
router.post("/", submitContact);

// Admin
router.get("/", getContacts);
router.get("/download", downloadContactsCSV);

module.exports = router;