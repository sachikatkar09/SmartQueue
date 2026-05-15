const express = require("express");

const router = express.Router();

const {
  bookAppointment,
  getAppointmentHistory,
  cancelAppointment,
} = require("../controllers/appointment.controller");

// Book Appointment
router.post("/book", bookAppointment);

// Appointment History
router.get("/history/:userId", getAppointmentHistory);

// Cancel Appointment
router.put("/cancel/:appointmentId", cancelAppointment);

module.exports = router;
