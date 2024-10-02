const jwt = require('jsonwebtoken');


const jwtAuthMiddleware = (req,res,next) =>{
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:"Unauthorized"});

try{
const decoded = jwt.verify(token,process.env.JWT_SECRET);
req.user = decoded
next();
}catch(err){
    console.error(err);
    res.status(401).json({
        error:"invalid token"
    });
}
}
const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

//module.exports = { auth };



module.exports = { jwtAuthMiddleware,generateToken};