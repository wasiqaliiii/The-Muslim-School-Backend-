const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  addGalleryImage,
  getGallery,
  deleteGalleryImage
} = require("../controllers/galleryController");

// Admin
router.post("/", upload.single("image"), addGalleryImage);
router.delete("/:id", deleteGalleryImage);

// Public
router.get("/", getGallery);

module.exports = router;
