const router = require("express").Router();
const upload = require("../middleware/upload");
const { createBlog, getBlogs } = require("../controllers/blogController");

router.post("/", upload.single("image"), createBlog);
router.get("/", getBlogs);

module.exports = router;