const asyncHandler=require("express-async-handler")
const User =require('../models/userModel');
const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken')
const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const userAvailabe=await User.findOne({email});
    if(userAvailabe){
        res.status(400);
        throw new Error("User already registerd");
    }

    const hashedPassword=await bcrypt.hash(password,10);
    console.log(hashedPassword)
    const user=await User.create({
        username,
        email,
        password:hashedPassword
    })
    if(user){
        res.status(201).json({_id:user.id,email:user.email})
    }
    else{
        res.status(400)
        throw new Error("User not valid")
    }
    res.json({message:"Register the user"})
})

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user=await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            },
        },process.env.ACCESS_TOKEN,{expiresIn:'1m'});
        res.status(200).json(accessToken)

    }
    else{
        res.status(401);
        throw new Error("Email or Password is not valid")
    }
    // const emailExist=await User.findOne(email);
    // const passwordExists=await User.findOne(password);
    // if(emailExist && passwordExists){
    //     res.status(200);
    //     res.json({message:"User Login Successful"})
    // }
    // else{
    //     res.status(404);
    //     throw new Error("User is not Present.Please Register")
    // }
})

const currentUser = asyncHandler(async(req,res)=>{
    res.json({message:"Current the user"})
})

module.exports={
    registerUser,
    loginUser,
    currentUser
};
