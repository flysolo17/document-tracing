const multer = require("multer");

const storage = multer.diskStorage({
  destination: "public/images",
  filename: (req, file, cb) => {
    // Generate a unique filename by appending a timestamp
    const timestamp = Date.now();
    cb(null, `${timestamp}_${file.originalname}`);
  },
});
const upload = multer({ storage: storage, fileFilter: imageFileFilter });
function imageFileFilter(req, file, cb) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Uploaded file is not an image."));
  }
}

module.exports = upload;
