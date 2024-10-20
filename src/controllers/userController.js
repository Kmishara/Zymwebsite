const User = require('../models/userModel'); // Import User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {generateToken} = require("../utilis/Jwt")
//const config = require('config');



exports.register = async (req, res) => {
   try{

   const {username,email,password}=req.body;

  
      const  user = new User({
            username,
            email,
            password,
           
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        const response =   await user.save();
        const payload = {id:response.id, username: response.username }
        console.log(JSON.stringify(payload))
        const token = generateToken(payload);
     
        console.log("Token is : ",token);

        await user.save();
console.log(user)
        res.redirect("/login");
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid email' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log(token);
        // Set token in cookie (httpOnly for security)
        res.cookie('authToken', token, {
            httpOnly: true,
            maxAge: 1 * 60 * 60 * 1000,  // 4 hours
            // secure: process.env.NODE_ENV === 'production',  // Use secure in production
        });
       
              return res.redirect('/abhi.html');
        
    
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.mind = async(req,res)=>{

    const token = req.cookies.token; // Retrieve the token from cookies

    if (!token) {
      console.log('No token found, redirecting to login...');
      return res.redirect('/login');
    }
  
    console.log('Token:', token);
    
    // Your logic for handling /mind goes here
    res.sendFile(path.join(__dirname, '../public', 'mind.html'));
}
exports.Fatgain = async(req,res)=>{
    res.redirect("/Fat")
}
exports.Fatloss = async(req,res)=>{
    res.redirect("/Fat-loss")
}
exports.logout = (req, res) => {
    res.clearCookie('token')
       console.log("token remove");
       res.redirect("/")
    //  res.send({ message: "successfully signed out!" });
   };