const express=require('express')
const router=new express.Router()
const authentication=require('../middleware/auth')
const {sendMessage,allMessages}=require('../controllers/message')

router.post('/sendMessage',authentication.verifyToken,sendMessage)
router.post('/allMessages',authentication.verifyToken,allMessages)

module.exports=router