const mysql = require('mysql');


const db = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "project",
    database: "dbms_project"
});
  
module.exports = db;


/*
CREATE USER 'sqluser'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON . TO 'sqluser'@'%';
FLUSH PRIVILEGES;
*/