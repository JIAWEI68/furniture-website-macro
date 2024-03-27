"use strict";

const userDB = require("../database/userDB.cjs");
const bcrypt = require("bcryptjs");
const window = require("window");

const Window = new window();

let UserDB = new userDB();

function register(req, res) {
  const user = "User";
  UserDB.register(
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    Window.btoa(req.body.password),
    "User",
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
        let hash = Window.atob(result[0].password);
        if (hash == password) {
          respond.json({ result: "login successful", id: result[0].id, roles: result[0].roles});
        } else {
          respond.json({ result: "incorrect password"});
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
    request.body.phoneNumber,
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
    Window.btoa(request.body.password),
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
