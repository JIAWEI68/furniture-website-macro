"use strict"

let db = require("../server/connection.cjs");
let bcrypt = require("bcrypt");

class userDB{
    register(firstName, lastName, email, password){
        let Password = bcrypt.hashSync(password, 10);
        let sql = "INSERT INTO Users (firstName, lastName, email, password) VALUES (?,?,?,?)";
        db.query(sql, [firstName, lastName, email, Password], (err, result) => {
            if(err) throw err;
            console.log("User Registered");
        });
    }

    login(email, callback) {
        let sql = "SELECT id, email, password, firstName, lastName, profilePicture from Foundation.Users WHERE email = ?";
        db.query(sql, [email], callback);
      }
    
    updateUser(id, firstName, lastName, email, password, profilePicture, callback){
        let Password = bcrypt.hashSync(password, 10);
        let sql = "UPDATE Foundation.Users SET firstName = ?, lastName = ?, email = ?, password = ?, profilePicture = ? WHERE id = ?;";
        return db.query(sql, [firstName, lastName, email, Password, profilePicture, id], callback);
    }
}

module.exports = userDB;