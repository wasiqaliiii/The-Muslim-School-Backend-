const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  createEvent,
  getEvents,
  deleteEvent,
  updateEvent
} = require("../controllers/eventController");

// Create Event (Image or Video Upload)
router.post("/", upload.single("media"), createEvent);

// Get All Events (Public)
router.get("/", getEvents);

// Update Event
router.put("/:id", upload.single("media"), updateEvent);

// Delete Event
router.delete("/:id", deleteEvent);

module.exports = router;