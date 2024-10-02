const jwt = require('jsonwebtoken');


// const authenticateToken= (req, res, next) =>{
//     const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
//     if (!token) {
//       return res.status(401).send('Access Denied: No Token Provided!');
//     }
  
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err) return res.status(403).send('Invalid Token');
//       req.user = user;
//       next();
//     });
//   }

//   const generateToken = (userData) =>{
//     return jwt.sign(userData,process.env.JWT_SECRET) , token;

// } 
// Middleware to check if the user is authenticated
//const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//         return res.status(403).json({ message: 'No token provided' });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) {
//             return res.status(403).json({ message: 'Token verification failed' });
//         }
//         req.user = user;  // Attach user to the request object
//         next();
//     });
// };

//const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.cookies.authToken;  // Check for the token in cookies

    if (!token) {
        return res.redirect('/login');  // Redirect to login page if no token
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify the token
        req.user = decoded;  // Store user information in request object
        next();  // Proceed to the next middleware or route handler
    } catch (err) {
        return res.redirect('/login');  // Redirect if token is invalid
    }
};

//module.exports = { auth };



module.exports = {auth};