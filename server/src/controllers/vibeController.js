const Vibe = require("../models/Vibe");

let ioInstance = null;

const setSocket = (io) => {
  ioInstance = io;
};

const sanitize = (str) => {
  return str.replace(/[<>]/g, "").trim();
};

const createVibe = async (req, res, next) => {
  try {
    let { message, emoji } = req.body;

    if (typeof message !== "string" || typeof emoji !== "string") {
      return res.status(400).json({
        error: "Invalid input format",
      });
    }

    message = sanitize(message);
    emoji = sanitize(emoji);

    if (!message || !emoji) {
      return res.status(400).json({
        error: "Message and emoji are required",
      });
    }

    if (message.length > 200 || emoji.length > 10) {
      return res.status(400).json({
        error: "Input exceeds allowed length",
      });
    }

    const vibe = await Vibe.create({ message, emoji });

    if (ioInstance) {
      ioInstance.emit("new_vibe", vibe);
    }

    return res.status(201).json(vibe);
  } catch (err) {
    next(err);
  }
};

const getVibes = async (req, res, next) => {
  try {
    const vibes = await Vibe.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .select("message emoji createdAt")
      .lean();

    res.status(200).json(vibes);
  } catch (err) {
    next(err);
  }
};

module.exports = { createVibe, setSocket, getVibes };