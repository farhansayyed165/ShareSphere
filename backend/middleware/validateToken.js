require("dotenv").config()
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next)=>{
    // console.log(req.headers)
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    console.log(authHeader)
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        // console.log(token)
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if(err){
                res.status(401)
                throw new Error("User not Authorized");
            }
            
            req.user = decoded.user
            req.goodUser = true
            // console.log(req.user)
            next();  
        })
    }
    if(!token){
        res.status(401);
        throw new Error("Token is not authorized")
    }
})

module.exports = validateToken;