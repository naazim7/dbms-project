const dbConfig = require('../config/dbConfig.js');

const { Sequelize, DataTypes } = require('sequelize');


const db = {};

//Creating a Instance for Sequelize


const sequelize =  new  Sequelize(

 dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle

        }
    }


)


//Authenticate the Sequelize

sequelize.authenticate()
    .then(() => {
        console.log("Database Connected Succesfully");
    })
    .catch(err => {
        console.log("Something Went Wrong" + err);
    })



db.sequelize = sequelize;
db.Sequelize = Sequelize;




db.users = require('./userModel.js')(sequelize, DataTypes);



//SyncWith Sequilize If True it will create new table when tha table is not exist

 db.sequelize.sync();
   



module.exports = db;