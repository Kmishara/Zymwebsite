const express = require('express');
const router = express.Router();
const authController = require('../controllers/userController');
//const authmiddleware = require('../middleware/authmiddleware'); // Ensure correct casing
const path = require('path');
//const { auth }  = require('../utilis/Jwt');
const authenticateJWT = require('../middleware/Authenticate');

// Route for the home page
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});
router.get("/mind",authenticateJWT,(req,res)=>{
  res.sendFile(path.join(__dirname,'../public','mind.html'))
})
router.get("/profile",authenticateJWT,(req,res)=>{
  res.sendFile(path.join(__dirname,'../public','profile.html'))
})

// router.post("/mind",authController.mind)
// Route for the registration page
router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'register.html'));
});




router.post('/mind', authController.mind);
router.post('/login', authController.login);

// Handle registration form submissions
router.post('/register', authController.register);

module.exports = router;