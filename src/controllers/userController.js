const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const {validationResult} = require("express-validator");

/*-----=^.^=--------- add a new User -----=^.^=-----*/

async function addUser(req, res, next) {
    console.log("=^.^= Hello New User!");

    // handling  the error
    try {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return res.status(400).send(err);
        }
        console.log(req.body);
        const {fullName, userName, email, password} = req.body;
        const result = await User.create({
            fullName,
            userName,
            email,
            password: await encryptPassword(password),
        });

        // Returning "result will expose the user password what isn't safe
        // res.status(200).send(result);

        res.status(200).send({
            fullName,
            userName,
            email,
        });
    } catch (err) {
        console.log(err);
        err.status(500);
        next(err);
    }
}

async function loginUser(req, res, next) {
    const { userName, password } = req.body;

    const user = await User.findOne({ userName });

    if (user == null) {
        return res.status(400).send({ msg: "No user found" });
    }
    try {
        if (bcrypt.compare(password, user.password)) {
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
module.exports = {addUser, loginUser};