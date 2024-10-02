const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token; // Assuming the JWT is stored in a cookie

  if (!token) {
    // If no token, redirect to login page
    return res.redirect('/login'); // Change this path to your actual login page route
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode and verify the token
    req.user = decoded; // Attach decoded user information to the request
    next(); // If valid, proceed to the next middleware or route handler
  } catch (error) {
    console.error('JWT verification error:', error.message); // Log error for debugging
    return res.redirect('/login'); // Redirect to login if token is invalid or expired
  }
};

module.exports = authenticateJWT;
