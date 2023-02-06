const express = require('express')
const mysql = require('mysql2');
var cors = require('cors');

const { registerUser, getAllUser, getUserById, deleteUserById } = require('./controller/userController');
const  connection  = require('./dbConfig/db');



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

// Database Connection

//*******************************************************//




connection.connect((error) => {
  if (error) throw error;
  console.log('Successfully connected to the MySQL database');
});


//*******************************************************//




app.get('/', (req, res) => {
    const user = pool.query('SELECT * FROM user');
    console.log(user);

})

app.post('/register', registerUser);
app.get('/users', getAllUser)
app.get('/user/:id',getUserById)
app.delete('/user/:id',deleteUserById)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});