const router = require("express").Router();
const { createNotice, getNotices } = require("../controllers/noticeController");

router.post("/", createNotice);
router.get("/", getNotices);

module.exports = router;