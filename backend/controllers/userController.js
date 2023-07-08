require("dotenv").config()
const asyncHandler =  require("express-async-handler");
const User = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const createUser = asyncHandler (async (req,res,next)=>{
    // Extracting and Checking if the email and passwords exist
    const {name, email, password} = req.body;
    // if any on of it doesn't exist, we throw an error and add return a status of 400
    if(!email || !password || !name){
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    // The following lines are checking if the email has already been used
    const userAvb = await User.findOne({email});
    // if the email exists, we throw an error
    if(userAvb){
        res.status(400);
        throw new Error("Email already registered")
    }

    // If everything is good, we can continue and create a user
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    })

    if(newUser){
        res.status(201).json({_id:newUser.id, email:newUser.email, message:"User Created Succefully"})
    }else{
        res.status(400)
        throw new Error("User data is not valid")
    }
    
    // res.status(201).json({message:"User Created Succesfully"})
});


const loginUser = asyncHandler(async (req,res,next)=>{
    // Extracting and Checking if the email and passwords exist
    const {email, password} = req.body;
    // if any on of it doesn't exist, we throw an error and add return a status of 400
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    
    // The following lines are checking if the email exists
    const user = await User.findOne({email});
    // if the email exists, we throw an error
    if (user && bcrypt.compare(password, user.password)){
        const accessToken = jwt.sign(
            {
                user:{
                    email:user.email,
                    id:user.id
                }
            },
            process.env.JWT_SECRET,
            {expiresIn: "10d"}
        )
        res.status(200).json({accessToken})
    }
    else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
    // res.status(200).json({message:"User logged in Succesfully"})
})

const viewProfile = asyncHandler (async (req, res)=>{
    const id = req.params.id
    const details = await User.findById(id);
    if(!details){
        res.status(404)
        throw new Error("User data is not valid")
    }
    details.password = null;
    res.status(200).json(details)
})

const updateUser = asyncHandler (async (req,res)=>{
    const id = req.user.id;
    const updatedUser = await Post.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    );
    res.status(400).json(updatedUser)
})

const deleteUser = asyncHandler(async (req,res)=>{
    const id = req.user.id;
    const user = await User.findById(id);
    if(!user){
        res.status(404)
        throw new Error("User data is not valid")
    }
    await User.deleteOne();
    res.json(user).status(200);
});

module.exports = {createUser, loginUser, viewProfile,updateUser, deleteUser}