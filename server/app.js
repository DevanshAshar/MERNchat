const cookieParser=require('cookie-parser')
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app=express()
const dotenv=require('dotenv').config()
const user=require('./routes/user')
const chat=require('./routes/chat')
const message=require('./routes/message')
require('./dbConnect')
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

const whitelist = [""];
const corsOptions = {
    origin: whitelist,
    optionsSuccessStatus: 200,
    credentials: true,
};
if (process.env.NODE_ENV === "development") {
    app.use(cors({ origin: true, credentials: true }));
} else {
    app.use(cors(corsOptions));
}

app.use('/user',user)
app.use('/message',message)
app.use('/chat',chat)

app.use((req, res, next) => {
    res.status(404).json({
        error: "not found",
    });
});

const server=app.listen(5000, () => console.log("server listening on 5000"));

const io=require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:'http://localhost:3000'
    }
})

io.on('connection',(socket)=>{
    console.log('connected to socket.io')
    socket.on('setup',(userData)=>{
        socket.join(userData._id)
        socket.emit('connected')
    })

    socket.on('join chat',(room)=>{
        socket.join(room)
    })

    socket.on('new message',(newMessage)=>{
        var chat=newMessage.chat
        if(!chat.users)
        return console.log('chat is empty')
        chat.users.forEach(user => {
            if(user._id==newMessage.sender._id)
            return
            socket.in(user._id).emit('message received',newMessage)
        });
    })

    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    })
})

