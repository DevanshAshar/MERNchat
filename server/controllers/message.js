const express=require('express')
const Message=require('../models/message')
const User=require('../models/user')
const Chat=require('../models/chat')
const sendMessage=async(req,res)=>{
    try {
        const {content,chatId}=req.body
        if(!content || !chatId)
        return res.status(400).json({message:'Pls fill all details'})
        const newMessage={
            sender:userData._id,
            content:content,
            chat:chatId
        }
        var message=await Message.create(newMessage)
        message=await message.populate("sender","name")
        message=await message.populate("chat")
        message=await User.populate(message,{
            path:"chat.users",
            select:"name email"
        })
        await Chat.findByIdAndUpdate(chatId,{latestMsg:message})
        res.status(200).json({message})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
const allMessages=async(req,res)=>{
    try {
        const {chatId}=req.body
        const messages=await Message.find({chat:chatId}).populate("sender","name email").populate("chat")
        res.status(200).json({messages})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

module.exports={sendMessage,allMessages}