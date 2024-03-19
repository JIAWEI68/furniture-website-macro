"use strict";

const userDB = require("../database/userDB.cjs");
const bcrypt = require("bcrypt");

let UserDB = new userDB();

function register(req, res) {
  UserDB.register(
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.password, function(error, result){
        if(error){
            res.status(500).send();
        } else {
            res.status(200).send();
        }
    }
  );
}

function login(request, respond) {
    let email = request.body.email;
    let password = request.body.password;
    UserDB.login(email, function (error, result) {
      if (error) {
        respond.json(error);
      } else {
        console.log(result);
        if (result.length > 0) {
          const hash = result[0].password;
          let flag = bcrypt.compare(password, hash);
          if (flag) {
            respond.json({result: "login successful"});
          } else {
            respond.json({ result: "incorrect password"});
          }
        } else {
          respond.json({ result: "incorrect username or password"});
        }
      }
    });
  }

function updateUser(request, respond){
    UserDB.updateUser(
        parseInt(request.params.id),
        request.body.firstName,
        request.body.lastName,
        request.body.email,
        request.body.password,
        request.body.profilePicture,
        function(error, result){
            if(error){
                respond.status(500).send(err);
            } else {
                respond.status(200).send(result);
            }
        }
    );
}

module.exports = { register, login, updateUser };
