"use strict";

const userDB = require("../database/userDB.cjs");
const bcrypt = require("bcryptjs");

let UserDB = new userDB();

function register(req, res) {
  UserDB.register(
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    bcrypt.hashSync(req.body.password, 10),
    function (error, result) {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).send(result);
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
      if (result.length > 0) {
        const hash = result[0].password.toString();
        let flag = bcrypt.compareSync(password, hash);
        console.log(flag);
        if (flag === true) {
          respond.json({ result: "login successful", id: result[0].id });
        } else {
          respond.json({ result: "incorrect password" });
        }
      } else {
        respond.json({ result: "incorrect username or password" });
      }
    }
  });
}

function updateUser(request, respond) {
  UserDB.updateUser(
    parseInt(request.params.id),
    request.body.firstName,
    request.body.lastName,
    request.body.email,
    request.body.password,
    request.body.profilePicture,
    function (error, result) {
      if (error) {
        respond.status(500).send(err);
      } else {
        respond.status(200).send(result);
      }
    }
  );
}

function getUserById(request, respond) {
  UserDB.getUserById(parseInt(request.params.id), function (error, result) {
    if (error) {
      respond.status(500).send(error);
    } else {
      respond.status(200).send(result);
    }
  });
}

function updatePassword(request, respond) {
  UserDB.changePassword(
    parseInt(request.params.id),
    bcrypt.hashSync(request.body.password, 10),
    function (error, result) {
      if (error) {
        respond.status(500).send(error);
      } else {
        respond.status(200).send(result);
      }
    }
  );
}

module.exports = { register, login, updateUser, getUserById, updatePassword };
