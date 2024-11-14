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
router.get("/abhi", authenticateJWT, (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "abhi.html"));
});
router.get("/shoulder", authenticateJWT, (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "shoulder.html"));
});
router.get("/back", authenticateJWT, (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "back.html"));
});
router.get("/chest", authenticateJWT, (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "chest.html"));
});
router.get("/biceps-triceps", authenticateJWT, (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "biceps-triceps.html"));
});
router.get("/contact", authenticateJWT, (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "contact.html"));
});
router.get("/about",  (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "about.html"));
});
// router.post("/mind",authController.mind)
// Route for the registration page
router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'register.html'));
});

router.get('/Fat', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'Fat.html'));
});
router.get('/Fat-loss', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'Fat-loss.html'));
});
router.post('/Fat', authController.Fatgain);


router.post('/Fat-loss', authController.Fatloss);
router.post('/mind', authController.mind);
router.post('/login', authController.login);

// Handle registration form submissions
router.post('/register', authController.register);
router.get("/logout", authController.logout);
module.exports = router;
