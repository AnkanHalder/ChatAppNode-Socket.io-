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

  socket.on('disconnect',()=>{
    console.log('Disconnected from server');
  });

});
// io.on('connection',(socket)=>{
//   console.log('New User Connected');
// });


server.listen(3000,()=>{
  console.log('Server is Upa and running on port 3000');
});
