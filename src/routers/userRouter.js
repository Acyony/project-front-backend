const router = require("express").Router();
const {
  addUser,
  loginUser,
  //logoutUser,
} = require("../controllers/userController");

router.post("/register", addUser);
router.post("/login", loginUser);
//router.get("/logout", logoutUser);
/* router.get("/:uid", getUserById);
router.get("/", getUsers);
router.put("/updates/:uid", updateUser);
router.delete("/delete/:uid", deleteUser); */

module.exports = router;
