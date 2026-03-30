const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const User = require("../models/User");

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const sanitize = (str) => {
  return str.replace(/[<>]/g, "").trim();
};

const signup = async (req, res, next) => {
  try {
    let { username, password } = req.body;

    if (typeof username !== "string" || typeof password !== "string") {
      return res.status(400).json({ error: "Invalid input format" });
    }

    username = sanitize(username).toLowerCase();
    password = password.trim();

    if (!username || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    if (username.length < 3 || username.length > 30) {
      return res.status(400).json({ error: "Invalid username length" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password too short" });
    }

    const existing = await User.findOne({ username }).lean();

    if (existing) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userId: uuidv4(),
      username,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: user.userId },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, COOKIE_OPTIONS);

    return res.status(201).json({
      userId: user.userId,
      username: user.username,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    let { username, password } = req.body;

    if (typeof username !== "string" || typeof password !== "string") {
      return res.status(400).json({ error: "Invalid input format" });
    }

    username = sanitize(username).toLowerCase();
    password = password.trim();

    if (!username || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const user = await User.findOne({ username }).lean();

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.userId },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, COOKIE_OPTIONS);

    return res.status(200).json({
      userId: user.userId,
      username: user.username,
    });
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", COOKIE_OPTIONS);

    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (err) {
    next(err);
  }
};

const me = async (req, res, next) => {
  try {
    const user = await User.findOne({ userId: req.user.userId })
      .select("userId username")
      .lean();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  login,
  logout,
  me,
};