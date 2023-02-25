const express=require('express')
const router = new express.Router();
const {accessChat,fetchChats,grpChat,addToGrp,remFrmGrp}=require('../controllers/chat')
const authentication=require('../middleware/auth')
router.post('/accessChat',authentication.verifyToken,accessChat)
router.get('/fetchChats',authentication.verifyToken,fetchChats)
router.post('/grpChat',authentication.verifyToken,grpChat)
router.patch('/addToGrp',authentication.verifyToken,addToGrp)
router.patch('/remFrmGrp',authentication.verifyToken,remFrmGrp)
module.exports=router