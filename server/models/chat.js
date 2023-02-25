const mongoose=require('mongoose')

const chatSchema=mongoose.Schema(
    {
        chatName:{type:String},
        isGrpChat:{type:Boolean,default:false},
        users:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }],
        latestMsg:{type:mongoose.Schema.Types.ObjectId,
        ref:'Message'},
        grpAdmin:{type:mongoose.Schema.Types.ObjectId,
            ref:'User'}
    },{timestamps:true}
)
const Chat=mongoose.model('Chat',chatSchema)
module.exports=Chat