const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

/**
 * Middlewares
 */
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const PORT = 3000;
/**
 * routes
 */
const authRoute = require("./routes/auth-route");

const appointmentsRoute = require("./routes/appointment-route");
app.use("/auth", authRoute);
app.use("/appointments", appointmentsRoute);

app.listen(PORT, () => {
  console.log("Server running to port:", PORT);
});
