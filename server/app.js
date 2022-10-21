const express = require('express')
const http = require('http')
const cors = require('cors')
const app = express()
const expressServer = http.createServer(app)
app.use(cors())
const { Server } = require('socket.io')
const io = new Server(expressServer, { cors: { origin: "*" } })
// const io = require('socket.io')(expressServer, { cors: { origin: "*" } });

let users = []

io.on('connection', (socket) => {
   
     socket.on('setUserName',(data)=>{
        if(users.indexOf(data)> -1){
            
             console.log('user exist')
             socket.emit('setUser',{exist: true})
             
        } 
        else{
           users.push(data)
           socket.emit('setUser',{exist: false,name:data})
           
        
        }
     })
 
  
    socket.on('msg',(data)=>{
        io.sockets.emit('newMessage',data)
    })

 
    socket.on('disconnect', () => {

    })

})


expressServer.listen(5000, () => {
    console.log("server listening at port 5000")
})