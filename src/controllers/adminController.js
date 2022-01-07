const User = require("../model/userModel");
const adminHome = (req, res) => {
  res.render("admin");
};

const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.uid;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.status(200).send(user);
    }
  } catch (err) {
    console.log(err);
    err.status(500);
    next(err);
  }
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

async function deleteUser(req, res, next) {
  try {
    const user = await User.findByIdAndDelete(req.params.uid);
    if (!user) {
      res.status(400).send("error:user not found");
    } else {
      res.status(200).send(user);
    }
  } catch {
    console.log(err);
    err.status(500);
    next(err);
  }
}
const logoutUser = (req, res, next) => {
  req.session.destroy();
  res.redirect(`/`);
};

module.exports = { getUserById, updateUser, deleteUser, adminHome, logoutUser };
