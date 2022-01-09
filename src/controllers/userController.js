const express = require('express')
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

async function loginUser(req, res, next) {
  const { userName, password } = req.body;

  const user = await User.findOne({ userName });

  if (user == null) {
    return res.status(400).send({ msg: "No user found" });
  }
  try {
    if (bcrypt.compare(password, user.password)) {
      req.session.user = user;
      res.status(200).json({ msg: "Success" });
    } else {
      res.status(400).json({ msg: "Denied" });
    }
  } catch (error) {
    console.log(error);
    error.status(500);
    next(error);
  }
}

/*add a new user*/
async function addUser(req, res, next) {
    console.log("Hello New User!");

    //handle the error
    try {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return res.status(400).send(err);
        }
        const { fullName, userName, email, password } = req.body;
        const result = await User.create({
            fullName,
            userName,
            email,
            password: await encryptPassword(password),
        });

        //returning "result" will expose the user, that is not safe

        res.status(200).send(result);
    } catch (err) {
        console.log(err);
        err.status(500);
        next(err);
    }
}
/*encrypting the password*/

const encryptPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

module.exports = {
  addUser,
  loginUser,
};

