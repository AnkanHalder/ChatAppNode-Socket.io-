const path=require('path');
const http=require('http');
const express=require('express');

const publicPath=path.join(__dirname,'../public');
const socketIO=require('socket.io');

var app=express();
var server=http.createServer(app);
var io=socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('New User Connected');

  socket.emit('newMessage',{
    from:'server',
    text:'Welcome to the chat',
    createdAt:'Joined '+new Date().getTime()
  });

  socket.broadcast.emit('newMessage',{
    from:'server',
    text:'New User Joined',
      createdAt:'Joined '+new Date().getTime()
  });


  socket.on('newMessage',(message)=>{
    io.emit('newMessage',{
    from:message.from,
    text:message.text,
    createdAt:new Date().getTime()
  });

  });

  socket.on('disconnect',()=>{
    console.log('Disconnected from server');
  });

});



server.listen(3000,()=>{
  console.log('Server is Upa and running on port 3000');
});
