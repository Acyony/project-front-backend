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

/*-----=^.^=---------to logout a user-----=^.^=-----*/
async function logoutUser(req, res) {
    req.logout();
    res.redirect("/");
}


/*-----=^.^=---------to get a user-----=^.^=-----*/
async function getUserById(req, res, next) {
    console.log("=^.^= Hello user!");
    try {
        console.log(req.params);
        const user = await User.findById(req.params.uid);
        if (!user) {
            res.status(404).send("User not found!");
        } else {
            res.status(200).send(user);
        }
    } catch (err) {
        console.log(err);
        err.status(500);
        next(err);
    }
}

/*-----=^.^=---------to get all users-----=^.^=-----*/
async function getAllUsers(req, res, next) {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        console.log(err);
        err.status(500);
        next(err);
    }
}

/*-----=^.^=---------to update a user-----=^.^=-----*/
async function updateUser(req, res, next) {
    try {
        const userId = req.params.uid;
        const userUpdated = await User.findByIdAndUpdate(
            userId,
            {
                $set: {
                    fullName: req.body.fullName,
                    userName: req.body.userName,
                    email: req.body.email,
                    password: req.body.password,
                },
            },
            {returnDocument: "after"}
        );
        if (userUpdated) {
            res.status(200).send({userUpdated});
        } else {
            res.status(404).send({msg: "User not found!"});
        }
    } catch (err) {
        console.log(err);
        err.status(500);
        next(err);
    }
}

/*-----=^.^=---------to delete a user-----=^.^=-----*/
async function deleteUser(req, res, next) {
    try {
        const deletedUser = await User.findOneAndDelete(req.params.uid);
        if (deletedUser) {
            res.status(200).send({deletedUser, msg: "User deleted successfully!"});
        } else {
            res.status(404).send({msg: "There is no user with the given id."});
        }
    } catch (err) {
        console.log(err);
        err.status(500);
        next(err);
    }
}

/*-----=^.^=--------- encrypting the password -----=^.^=-----*/
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

module.exports = {addUser, getUserById, getAllUsers, updateUser, deleteUser, logoutUser};