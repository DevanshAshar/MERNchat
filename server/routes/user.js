const express=require('express')
const router = new express.Router();
const{newUser,userLogin,allUsers}=require('../controllers/user')
const authentication=require('../middleware/auth')
router.post('/newUser',newUser)
router.post('/userLogin',userLogin)
router.get('/allUsers',authentication.verifyToken,allUsers)
module.exports=router
