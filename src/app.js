const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
/**
 * Middlewares
 */

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server running to port:", PORT);
});
