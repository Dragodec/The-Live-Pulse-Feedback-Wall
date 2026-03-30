const express = require("express");
const router = express.Router();

const rateLimiter = require("../middleware/rateLimiter");
const auth = require("../middleware/auth");
const { createVibe, getVibes } = require("../controllers/vibeController");

// protected + rate limited
router.post("/", auth, rateLimiter, createVibe);

// public feed
router.get("/", getVibes);

module.exports = router;