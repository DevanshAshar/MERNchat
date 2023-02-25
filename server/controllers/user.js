const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const User=require('../models/user')

const newUser=async(req,res)=>{
    try{
    const {name,email,password}=req.body
    if(!name || !email || !password )
    return res.status(400).json({message:'Please fill all details'})
    const user=new User(req.body)
    await user.save()
    res.status(200).json({message:'Registered'})
    }catch(err){
        res.status(400).json({message:err.message})
    }
}

const userLogin=async(req,res)=>{
    try {
        const {email,password}=req.body
        if (!email || !password)
        return res.status(400).json({ message: "Please Fill the Details" });
        const user=await User.findOne({email:email})
        if (!user)
        return res.status(400).json({ message: "User not found" });
        const validPassword = await bcrypt.compare(req.body.password,user.password);
        if (!user || !validPassword)
        return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign({_id:user._id}, process.env.SECRET_KEY);
        res.status(200).json({token,user})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const allUsers=async(req,res)=>{
    try {
        const keyword=req.query.search?{
            $or:[
                {name:{$regex:req.query.search}},
                {email:{$regex:req.query.search}}
            ]
        }:{}
        const users=await User.find(keyword).find({_id:{$ne:userData._id}})
        req.status(200).json({users})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

module.exports={newUser,userLogin,allUsers}