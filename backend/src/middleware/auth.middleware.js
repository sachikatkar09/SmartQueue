const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "Access Denied. No Token Provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user data
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = authMiddleware;
