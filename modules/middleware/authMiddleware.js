const jwt = require('jsonwebtoken')
require('dotenv').config();


const secretKey = 'erbr4br634b6erbt6b1s36trb1'


const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(token)


if(!token){
    return res.status(401).json({ error: "Unauthorized" });
}

try{
    const decoded = jwt.verify(token, secretKey);
    console.log("decodedd: ",decoded)
    req.user = decoded;
    next();
}catch (err){
    return res.status(401).json({ error: "Invalid Token"});
}

};

module.exports = authenticate;