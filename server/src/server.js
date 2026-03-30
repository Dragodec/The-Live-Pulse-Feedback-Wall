require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");

const connectDB = require("./config/db");
const vibeRoutes = require("./routes/vibeRoutes");
const authRoutes = require("./routes/authRoutes");
const { setSocket } = require("./controllers/vibeController");

const app = express();
const server = http.createServer(app);

// 🔌 Socket.io setup
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  },
});

// inject socket instance into controller
setSocket(io);

// 🧱 Core Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" })); // prevent large payload abuse
app.use(cookieParser());

// 🛣️ Routes
app.use("/api/vibe", vibeRoutes);
app.use("/api/auth", authRoutes);

// 🩺 Health check
app.get("/", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// 🚨 Centralized Error Handler
app.use((err, req, res, next) => {
  const status = err.status || 500;

  if (process.env.NODE_ENV === "production") {
    return res.status(status).json({
      error: "Internal Server Error",
    });
  }

  return res.status(status).json({
    error: err.message || "Server Error",
  });
});

// 🗄️ DB + Server Boot
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  server.listen(PORT, () => {
    // intentionally no noisy logs
  });
};

startServer();