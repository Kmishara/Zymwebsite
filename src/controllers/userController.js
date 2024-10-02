const User = require('../models/userModel'); // Import User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const config = require('config');



exports.register = async (req, res) => {
   try{

   const {username,email,password}=req.body;

  
      const  user = new User({
            username,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
console.log(user)
        res.redirect("/login");
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


// exports.login = async (req, res) => {

//   const { email, password } = req.body;
//   console.log("Request body:", req.body);
//   try {

//     console.log("Email received:", email); // Debug log

//    // const users = await User.findOne({ email });
//    const user = await User.findOne({ email });
//    console.log("User found:", user); // Check if user is found
//     //   if (!user) {
//     //       return res.status(400).json({ msg: 'Invalid email ' });
//     //   }
//     if (!user) {
//         return res.status(400).json({ msg: 'Invalid email' });
//       }
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//           return res.status(400).json({ msg: 'Invalid password ' });
      
     
//       }
//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//         expiresIn: '1h', // Token expires in 1 hour
//     });
//     console.log(token)
//     console.log(user._id)
//         res.redirect("/profile.html")
//     //   window.location.href = './profile.html'
  
//   } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server error');
//   }
// };

// exports.login = async (req, res) => {
//     console.log("Complete request body:", req.body); // Log the complete body
  
//     const { email, password } = req.body;
//     console.log("Email received:", email); // Debug log
//     try {
//       const user = await User.findOne({ email });
//       if (!user) {
//         return res.status(400).json({ msg: 'Invalid email' });
//       }
//       const isMatch = await bcrypt.compare(password, user.password);
//       if (!isMatch) {
//         return res.status(400).json({ msg: 'Invalid password' });
//       }
  
//     //   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//     //     expiresIn: '4h', // Token expires in 1 hour
//     //   });
     
//       res.redirect("/profile");
//       console.log("Redirecting to profile...");
//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '4h' });
//       console.log("token:",token) ;
//       console.log(user._id);
// // Store the token in an HTTP-only cookie
// res.cookie('authToken', token, { httpOnly: true });

// res.redirect('/profile'); // After setting the token, redirect to /profile

//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server error');
//     }
//   };
  
// exports.login = async (req, res) => {
//     console.log("Complete request body:", req.body); // Log the complete body
  
//     const { email, password } = req.body;
//     console.log("Email received:", email); // Debug log
//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ msg: 'Invalid email' }); // Use return to stop further execution
//         }
        
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ msg: 'Invalid password' }); // Return to prevent further code
//         }
  
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '4h' });
//         console.log("token:", token);
//         console.log(user._id);

//         // Set token in cookie and redirect (make sure no other response is sent)
//         res.cookie('authToken', token, { httpOnly: true });
        
//         return res.redirect('/');  // Add return to prevent further code execution
    

//     } catch (err) {
//         console.error(err.message);
//         return res.status(500).send('Server error'); // Always return after sending response
//     }
// };

// exports.login = async (req, res) => {
//     console.log("Complete request body:", req.body);

//     const { email, password } = req.body;
//     const redirectUrl = req.query.redirect || './mind.html';  // Default to '/' if no redirect URL is provided

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ msg: 'Invalid email' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ msg: 'Invalid password' });
//         }

//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '4h' });
//         console.log("token:", token);
//         console.log(user._id);

//         // Set token in cookie and redirect (ensure no other response is sent)
//         res.cookie('authToken', token, { httpOnly: true });

//         return res.redirect(redirectUrl);  // Redirect to the original destination (if specified)

//     } catch (err) {
//         console.error(err.message);
//         return res.status(500).send('Server error');
//     }
// };
// exports.login = async (req, res) => {
//     console.log("Complete request body:", req.body);

//     const { email, password } = req.body;
//     // const redirectUrl = req.body.redirect || './mind.html';  // Default to '/mind' if no redirect URL is provided

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ msg: 'Invalid email' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ msg: 'Invalid password' });
//         }

//         // Generate JWT token
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '4h' });
//         console.log("token:", token);

//         // Set token in cookie (httpOnly and secure in production)
//         res.cookie('authToken', token, { httpOnly: true, maxAge: 4 * 60 * 60 * 1000 });  // Token valid for 4 hours

//         // return res.redirect("mind.html");  // Redirect to the original destination (e.g., /mind)
//         res.redirect("/mind.html")
//     } catch (err) {
//         console.error(err.message);
//         return res.status(500).send('Server error');
//     }
// };


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

        // Redirect to protected page
       res.redirect("/profile.html"); 
        // Redirect to /mind route
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
