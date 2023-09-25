const express = require("express");
const {
  getUserByEmail,
  createUser,
  getUserByID,
} = require("../services/auth-service");
const { checkPassword, hashPassword } = require("../security/encryption");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await getUserByEmail(email);
  if (result.length !== 0) {
    const user = result[0];
    const matchedPassword = await checkPassword(password, user.password);
    if (matchedPassword) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: "invalid password" });
    }
  } else {
    res.status(404).json({ message: "User not found!" });
  }
});
router.post("/register", async (req, res) => {
  const {
    fullname,
    address,
    gender,
    birthdate,
    age,
    status,
    phone,
    type,
    email,
    password,
  } = req.body;
  try {
    user = {
      fullname,
      address,
      gender,
      birthdate,
      age,
      status,
      phone,
      type,
      email,
      password,
    };

    const result = await createUser(user);
    if (result) {
      res.status(201).json({
        message: "Successfully registered!",
      });
    } else {
      res.status(500).json({
        message: "Failed to register!",
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  const id = req.query.id;
  if (!id || isNaN(id)) {
    return res
      .status(400)
      .json({ message: "Invalid or missing 'id' parameter." });
  }
  const result = await getUserByID(+id);
  if (result.length !== 0) {
    res.status(200).json(result[0]);
  } else {
    res.status(404).json({ message: "User not found!" });
  }
});

module.exports = router;
