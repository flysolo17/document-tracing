const { queries } = require("../config/cofiguration");
const connection = require("../config/connection");

async function createAppointment(appointment) {
  try {
    await connection(queries.APPOINTMENT_QUERIES.CREATE_APPOINTMENT, [
      appointment.user_id,
      appointment.government_id,
      appointment.purpose_id,
      appointment.createdAt,
      appointment.outlet,
      appointment.appointmentDate,
      appointment.appointmentStatus || "pending",
    ]);
    return true;
  } catch (error) {
    return false;
  }
}

async function getAllAppointments() {
  try {
    const result = await connection(
      queries.APPOINTMENT_QUERIES.GET_ALL_APPOINTMENTS
    );
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function updateAppointmentStatusById(id, status) {
  const connection = await pool.getConnection();
  try {
    await connection(queries.APPOINTMENT_QUERIES.UPDATE_APPOINTMENT_STATUS, [
      id,
      status,
    ]);
    return true;
  } catch (error) {
    return false;
  }
}
module.exports = {
  createAppointment,
  getAllAppointments,
  updateAppointmentStatusById,
};
