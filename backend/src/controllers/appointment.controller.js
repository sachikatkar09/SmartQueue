const Appointment = require("../models/Appointment");

// BOOK APPOINTMENT
const bookAppointment = async (req, res) => {
  try {
    const { userId, department, appointmentDate, tokenNumber } = req.body;

    const appointment = await Appointment.create({
      userId,
      department,
      appointmentDate,
      tokenNumber,
    });

    res.status(201).json({
      success: true,
      message: "Appointment Booked Successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET APPOINTMENT HISTORY
const getAppointmentHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const appointments = await Appointment.find({
      userId,
    });

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CANCEL APPOINTMENT
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment Not Found",
      });
    }

    // Update status
    appointment.status = "cancelled";

    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment Cancelled Successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  bookAppointment,
  getAppointmentHistory,
  cancelAppointment,
};
