"use strict";

let db = require("../server/connection.cjs");
let bcrypt = require("bcryptjs");

class userDB {
  register(firstName, lastName, email, password, roles, callback) {
    let sql =
      "INSERT INTO Users (firstName, lastName, email, password) VALUES (?,?,?,?)";
    db.query(sql, [firstName, lastName, email, password, roles], callback);
  }

  login(email, callback) {
    let sql =
      "SELECT id, email, password, firstName, lastName, phoneNumber from Foundation.Users WHERE email = ?";
    db.query(sql, [email], callback);
  }

  updateUser(
    id,
    firstName,
    lastName,
    email,
    phoneNumber,
    callback
  ) {
    let sql =
      "UPDATE Foundation.Users SET firstName = ?, lastName = ?, email = ?, phoneNumber = ? WHERE id = ?;";
    return db.query(
      sql,
      [firstName, lastName, email, phoneNumber, id],
      callback
    );
  }

  getUserById(id, callback){
    let sql = "SELECT * FROM Foundation.Users WHERE id = ?";
    db.query(sql, [id], callback);
  }
  
  changePassword(id, password, callback){
    let sql = "UPDATE Foundation.Users SET password = ? WHERE id = ?";
    db.query(sql, [password, id], callback);
  }

}

module.exports = userDB;
