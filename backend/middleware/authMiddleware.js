const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user based on the ID in the token payload and attach it to the request object
      req.user = await User.findById(decoded.id).select("-password");

      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401).json({ message: "Not authorized, invalid token provided" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, token must be provided" });
  }
};

module.exports = { protect };
