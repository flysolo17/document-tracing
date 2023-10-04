const nodemailer = require("nodemailer");
const { getUserByID } = require("./auth-service");

const transporter = nodemailer.createTransport({
  host: "smtp.forwardemail.net",
  port: 465,
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendEmail(req, res, next) {
  const id = Number(req.query.id);
  const result = await getUserByID(id);
  if (result.length === 0) {
    return res
      .status(404)
      .json({ message: "User not found and we can't send you an email" });
  }
  const mailOptions = {
    from: process.env.EMAIL,
    to: result[0].email,
    subject: "UPDATE APPOINTMENT STATUS",
    text: `Your appointment has been ${req.body.appointmentStatus}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: error });
    } else {
      console.log("Email sent successfully:", info.messageId);
    }
    transporter.close();
    next();
  });
}

module.exports = { transporter, sendEmail };
