const db = require('../models');

//create main model


const User = db.users;

//Main Work start from here


//id,name,username,password,bio,proPic

//1.Create user 
const addUser = async (req, res) => {
    
    let info = {
        id: req.body.id,
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        bio: req.body.bio ? req.body.bio : "No bio is added,Please add your bio",
        proPic: req.body.proPic
    }
    try {
 
       const user = await User.create(info);
    
    res.status(200).send(user);
    console.log(user);
} catch (err) {
  // Handle error
  console.log("Something is wrong");
}

    
    
    



    
}


//2. Get All user API


const getAllUser = async (req, res) => {
    let users = await User.findAll({});
    res.status(200).send(users);


}


//3.Get Single user
const getSingleUser = async (req, res) => {
    let id = req.params.id;

    let users = await User.findOne({where:{id:id}});
    res.status(200).send(user);


}


//4. Update user

const updateUser = async (req, res) => {
    let id = req.params.id;
    const user = await User.update(req.body, { where: { id: id } });
    res.status(200).send(user);
   


}

//5.Delete User


const deleteUser = async (req, res) => {
    let id = req.params.id;
    await User.destroy(req.body, { where: { id: id } });
    res.status(200).send("User is Deleted");
   


}





module.exports = {
    
    addUser,
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser

}