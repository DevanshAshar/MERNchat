const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const User=require('../models/user')
const Chat=require('../models/chat')

const accessChat=async(req,res)=>{
    const {userId}=req.body
    if(!userId){
        return res.status(400).json({message:'User not found'})
    }
    var isChat=await Chat.find({
        isGrpChat:false,
        $and:[
            {$users:{$elemmatch:{$eq:userData._id}}},
            {$users:{$elemmatch:{$eq:userId}}}
        ]
    }).populate("users","-password").populate("latestMsg")
    isChat=await User.populate(isChat,{
        path:'latestMsg.sender',
        select:'name email'
    })
    if(isChat.length>0)
    res.status(200).json(isChat[0])
    else
    {
        var chatData={
            chatName:'sender',
            isGrpChat:false,
            users:[userData._id,userId]
        }    
    
    try {
        const chat=await Chat.create(chatData)
        const fullChat=await Chat.findById(chat._id).populate("users","-password")
        res.status(200).json({fullChat})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
    }
}

const fetchChats=async(req,res)=>{
    try {
        await Chat.find({users:{$elemMatch:{$eq:userData._id}}})
        .populate('users','-password')
        .populate('latestMsg')
        .populate('grpAdmin','-password')
        .sort({updatedAt:-1})
        .then(async(results)=>{
            results=await User.populate(results,{
                path:'latestMsg.sender',
                select:'name email'
            })
            res.status(200).json({results})
    })
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const grpChat=async(req,res)=>{
    try {
        const { name, bodyUsers}=req.body
        if(!req.body.name || !req.body.users)
        return res.status(400).json({message:'Please fill all details'})
        var allUsers=JSON.parse(req.body.users)
        if(allUsers.length<2){
            return res.status(400).json({message:'Grp must have atleast 3 people'})
        }
        allUsers.push(userData)
        const chat=await Chat.create({
            chatName:req.body.name,
            users:allUsers,
            isGrpChat:true,
            grpAdmin:userData
        })
        const fullChat=await Chat.findById(chat._id).populate('users','-password').populate('grpAdmin','-password')
        res.status(200).json({fullChat})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const addToGrp=async(req,res)=>{
    try {
        const { chatId, userId}=req.body
        const chat=await Chat.findById(chatId)
        if(JSON.stringify(userData._id)!=JSON.stringify(chat.grpAdmin))
        return res.status(401).json({message:'Unauthorized'})
        const newUser=await Chat.findByIdAndUpdate(chatId,{
            $addToSet:{users:userId}
        }).populate("users","-password")
        .populate("grpAdmin","-password")
        if(!newUser)
        res.status(400).json({message:'error'})
        res.status(200).json({newUser})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

const remFrmGrp=async(req,res)=>{
    try {
        const { chatId, userId}=req.body
        const chat=await Chat.findById(chatId)
        if(JSON.stringify(userData._id)!=JSON.stringify(chat.grpAdmin))
        return res.status(401).json({message:'Unauthorized'})
        const newUser=await Chat.findByIdAndUpdate(chatId,{
            $pull:{users:userId}
        }).populate("users","-password")
        .populate("grpAdmin","-password")
        if(!newUser)
        res.status(400).json({message:'error'})
        res.status(200).json({newUser})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

module.exports={accessChat,fetchChats,grpChat,addToGrp,remFrmGrp}