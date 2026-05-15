const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const queueRoutes = require("./routes/queue.routes");
const appointmentRoutes = require("./routes/appointment.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("SmartQueue API Running...");
});

// Routes
app.use("/api/auth", authRoutes);

app.use("/api/queue", queueRoutes);

app.use("/api/appointment", appointmentRoutes);

module.exports = app;
