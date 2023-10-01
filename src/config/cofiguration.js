const fs = require("fs");

const connection = require("../config/connection");

async function runSchema() {
  try {
    const schemaSQL = fs.readFileSync("schema.sql", "utf-8");
    await connection(schemaSQL);
    console.log("Schema executed successfully.");
  } catch (error) {
    console.error("Error running schema:", error);
  }
}
const queries = {
  AUTH_QUERIES: {
    SIGN_UP: `
      INSERT INTO users
        (fullname, address, gender, birthdate, age, status, phone, type, email, password)
      VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
    GET_USER_BY_EMAIL: "SELECT * FROM users WHERE email = ?",
    GET_USER_BY_ID: "SELECT * FROM users WHERE id = ?",
  },

  APPOINTMENT_QUERIES: {
    CREATE_APPOINTMENT: `
    INSERT INTO appointments
      (user_id, government_id, purpose_id, createdAt, outlet, appointmentDate, appointmentStatus)
    VALUES
      (?, ?, ?, ?, ?, ?, ?)
    `,
    GET_ALL_APPOINTMENTS: `
    SELECT 
      appointments.id,
      users.fullname,
      appointments.outlet,
      DATE_FORMAT(appointments.appointmentDate, '%Y-%m-%d') AS date,
      DATE_FORMAT(appointments.appointmentDate, '%H:%i') AS time,
      appointments.government_id,
      purposes.purpose_name AS 'purpose',
      appointments.appointmentStatus
    FROM appointments
    JOIN users ON appointments.user_id = users.id
    JOIN purposes ON appointments.purpose_id = purposes.purpose_id
    ORDER BY appointments.appointmentDate DESC
    `,
    GET_APPOINTMENT_BY_ID: `SELECT * FROM appointments WHERE id = ?`,
    DELETE_APPOINTMENT_BY_ID: `DELETE FROM appointments WHERE id = ?`,
    UPDATE_APPOINTMENT_STATUS: `UPDATE appointments SET appointmentStatus = ? WHERE id = ?`,
  },
};

module.exports = { runSchema, queries };
