const express = require('express')
const mysql = require('mysql2');
var cors = require('cors')



const app = express();

const port = 8000;
//setting cors

var corsOptions = {
  origin: 'https://localhost:8000'
}
//MiddleWare
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }))


//Routers For user

const userRouter = require('./routes/userRoute.js');

app.use('/api/users', userRouter);








app.get('/', (req, res) => {
  res.send('Hello World!')
})














app.listen(port, () => {
  
 

  console.log(`Example app listening on port ${port}`)
})





/*
{
  "name":"Nazim",
  "userName":"naazim7",
  "password":"pass",
  "bio":"I am gullyboy",
  "proPic":"Apatoto Nai"
  
}


*/



