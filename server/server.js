const path=require('path');

const express=require('express');

var app=express();
const publicPath=path.join(__dirname,'../public');

app.use(express.static(publicPath));
app.set('view engine','html');

app.get('/',(req,res)=>{
  res.send('index.html')
});



app.listen(3000,()=>{
  console.log('Server is Upa and running on port 3000');
});
