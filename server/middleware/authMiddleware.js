const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "secretkey");

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    req.user = decoded;
    next();

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyAdmin;
