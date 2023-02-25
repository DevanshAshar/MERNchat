const jwt=require('jsonwebtoken')
const User=require('../models/user')

const authentication= {
    verifyToken:async(req,res,next)=>{
    try {
        let token=req.header('AuthenticateUser')
        if(typeof(token)==="undefined")
        return res.status(401).json({error:'Unauthorized'})
        else
        {
        if(token.startsWith('Bearer ')){
        token=token.slice(7,token.length)
        }
        if(token)
        {
            try {
                const data=jwt.verify(token,process.env.SECRET_KEY)
                const user=await User.findById(data._id)
                userData=user
                next()
            } catch (error) {
                return res.status(400).json({error:'Invalid Token'})
            }
        }
    }
}catch (error) {
    return res.status(401).send(error.message)
}
}
}
module.exports=authentication