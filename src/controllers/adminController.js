const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const {validationResult} = require("express-validator");

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
//
// /*-----=^.^=---------to get all users-----=^.^=-----*/
// async function getAllUsers(req, res, next) {
//     try {
//         const users = await User.find({});
//         res.send(users);
//     } catch (err) {
//         console.log(err);
//         err.status(500);
//         next(err);
//     }
// }

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
            { returnDocument: "after" }
        );
        if (userUpdated) {
            res.status(200).send({ userUpdated });
        } else {
            res.status(404).send({ msd: "User not found!" });
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


const adminHome = (req, res) => {
  res.render("admin");
};


// const getUsers = async (req, res, next) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (err) {
//     console.log(err);
//     err.status(500);
//     next(err);
//   }
// };


const logoutUser = (req, res, next) => {
  req.session.destroy();
  res.redirect(`/`);
};

module.exports = { getUserById, updateUser, deleteUser, adminHome, logoutUser };
