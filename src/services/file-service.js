const puppeteer = require("puppeteer");
const fs = require("fs/promises"); // Use the fs/promises module for async file operations

async function generatePDF(htmlContent, cssStyles, outputPath) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:4200/admin");

  await page.pdf({ path: outputPath, format: "A4" });
  await browser.close();
}

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

const outputPath = "output.pdf";
module.exports = { generatePDF };
