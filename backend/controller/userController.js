const connection = require("../dbConfig/db");



const registerUser = (req, res) => {
const { name, email, password ,bio,proPic} = req.body;
//console.log(name)
  const query = `INSERT INTO user (name, email, password,bio,proPic) VALUES ('${name}', '${email}', '${password}','${bio}','${proPic}')`;

  connection.query(query, (error, result) => {
    if (error) throw error;
    console.log(`User ${name} successfully registered`);
    res.send('User successfully registered');
  });
}


//*******************************************************//

const getAllUser = (req, res) => {
    
 const query = `SELECT * FROM user`;

  connection.query(query, (error, result) => {
    if (error) throw error;
      console.log(result);
      res.send(result)
    
  });


    
}



//*******************************************************//

const getUserById = (req, res) => {
    const id = req.params.id;
 const query = `SELECT * FROM user where id=${id}`;

  connection.query(query, (error, result) => {
    if (error) throw error;
      console.log(result);
      res.send(result)
    
  });


    
}

//*******************************************************//


const deleteUserById = (req, res) => {
    const id = req.params.id;
 const query = `DELETE  FROM user where id=${id}`;

  connection.query(query, (error, result) => {
    if (error) throw error;
      console.log(result);
      res.send("Deleted Succesfully")
    
  });


    
}






module.exports={
    registerUser
    ,
    getAllUser,
    getUserById,deleteUserById
}