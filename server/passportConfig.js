const db = require('./db');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    passport.use(
        new localStrategy((username, password, done) => {
            const query = "SELECT * FROM dbms_project.user where username = ?";
            db.query(query, [username] ,(err, rows) => {
                if(err)throw err;  
                if(rows.length === 0) {
                    return done(null, false);
                }
                bcrypt.compare(password, rows[0].password, (err, result) => {
                    if (err) throw err;
                    if (result === true) {
                        return done(null, rows[0]);
                    } 
                    else {
                        return done(null, false);
                    }
                })
            })
        }))


    passport.serializeUser((user, done) => {
        done(null, user.user_id);
    })


    passport.deserializeUser((user_id, done) => {
        const query = "SELECT * FROM dbms_project.user where user_id = ?";
        //console.log(query)
        db.query(query, [user_id] ,(err, rows) => {
            if(err)throw err;  
            const userInfo = {
                user_id: rows[0].user_id,
                username: rows[0].username
            }
            done(null, userInfo);
        })
    }) 
}