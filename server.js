require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const db = require("./models/db");
const app = express();

app.use(express.json());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/notices", require("./routes/noticeRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/admission", require("./routes/admissionRoutes"));
app.use("/api/gallery", require("./routes/galleryRoutes"));
app.use("/api/blog", require("./routes/blogRoutes"));

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    res.json({
      message: "Database Connected Successfully",
      result: rows[0].result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Database Connection Failed",
      error: error.message,
    });
  }
});
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`),
);
