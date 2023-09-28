const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const { createPDF, generatePDF } = require("./services/file-service");

/**
 * Middlewares
 */
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);
const PORT = 3000;
/**
 * routes
 */
const authRoute = require("./routes/auth-route");
const appointmentsRoute = require("./routes/appointment-route");

app.use("/auth", authRoute);
app.use("/appointments", appointmentsRoute);
const imagePath = "1695604696016_logo.png";
app.get("/pdf", async (req, res) => {
  // Usage example:
  const htmlContent = `
<h1>Hello, PDF!</h1>
<p>This is a sample PDF generated with Puppeteer.</p>
`;

  const cssStyles = `
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
}
h1 {
  color: #333;
}
p {
  color: #666;
}
`;

  const outputPath = "public/files/output.pdf";

  generatePDF(htmlContent, cssStyles, outputPath)
    .then(() => {
      res.send("Success");
    })
    .catch((error) => {
      res.send(error);
    });
});

app.listen(PORT, () => {
  console.log("Server running to port:", PORT);
});
