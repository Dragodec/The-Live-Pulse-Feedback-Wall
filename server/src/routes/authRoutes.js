const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  me,
} = require("../controllers/authController");

const auth = require("../middleware/auth");

// public routes
router.post("/signup", signup);
router.post("/login", login);

// protected routes
router.post("/logout", auth, logout);
router.get("/me", auth, me);

module.exports = router;