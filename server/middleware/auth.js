const jwt = require("jsonwebtoken");

// 🔐 1️⃣ Verify Token (User Logged In)
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "secretkey");

    req.user = decoded; // store user data
    next();

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// 👑 2️⃣ Verify Admin Role
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };
