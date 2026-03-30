const requests = new Map();

const LIMIT = 3;
const WINDOW = 60 * 1000;

const cleanup = (key, now) => {
  const timestamps = requests.get(key) || [];
  const valid = timestamps.filter((t) => now - t < WINDOW);

  if (valid.length > 0) {
    requests.set(key, valid);
  } else {
    requests.delete(key);
  }

  return valid;
};

const rateLimiter = (req, res, next) => {
  const key =
    req.user?.userId ||
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket.remoteAddress;

  const now = Date.now();
  const timestamps = cleanup(key, now);

  if (timestamps.length >= LIMIT) {
    return res.status(429).json({
      error: "Too many requests. Try again later.",
    });
  }

  timestamps.push(now);
  requests.set(key, timestamps);

  next();
};

module.exports = rateLimiter;