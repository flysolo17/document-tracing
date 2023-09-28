const express = require("express");
const router = express.Router();

const { check, validationResult } = require("express-validator");
const upload = require("../services/uploader-service");
const {
  updateAppointmentStatusById,
  getAllAppointments,
  createAppointment,
} = require("../services/appointment-service");

router.post(
  "/create-appointment",
  upload.single("government_id"),
  [
    check("user_id").toInt().isInt(),
    check("purpose_id").toInt().isInt(),
    check("outlet").notEmpty(),
    check("appointmentDate").isISO8601(),
    check("appointmentStatus")
      .optional()
      .isIn(["pending", "schedulled", "cancelled", "complete"]),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }
    const appointment = {
      user_id: req.body.user_id,
      government_id: req.file.filename,
      purpose_id: req.body.purpose_id,
      createdAt: new Date(), // You can set this to the current timestamp
      outlet: req.body.outlet,
      appointmentDate: req.body.appointmentDate.slice(0, 19).replace("T", " "),
      appointmentStatus: req.body.appointmentStatus || "pending",
    };
    console.log(appointment);
    try {
      const success = await createAppointment(appointment);

      if (success) {
        return res
          .status(201)
          .json({ message: "Appointment created successfully" });
      } else {
        return res
          .status(500)
          .json({ message: "Failed to create appointment" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const appointments = await getAllAppointments();

    // Modify the "appointmentDate" field to include both date and time
    const formattedAppointments = appointments.map((appointment) => {
      // Assuming "appointmentDate" is a valid ISO date string (e.g., "2023-10-10T14:30:00.000Z")
      const appointmentDate = new Date(
        appointment.appointmentDate
      ).toLocaleString();

      return {
        ...appointment,
        appointmentDate, // Replace the existing "appointmentDate" field
      };
    });

    return res.status(200).json(formattedAppointments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update-status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const success = await updateAppointmentStatusById(id, status);
    if (success) {
      return res
        .status(200)
        .json({ message: "Appointment status updated successfully" });
    } else {
      return res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
