const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    // Check if token exists
    if (!authHeader) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }
    // Extract token (Bearer token)
    const token = authHeader.split(" ")[1];
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user to request
    req.user = decoded;
    // Move to next function
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
module.exports = authMiddleware;
