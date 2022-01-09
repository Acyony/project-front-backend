const router = require("express").Router();
const {
    getUserById,
    updateUser,
    deleteUser,
    adminHome,
    logoutUser,

} = require("../controllers/adminController");

const {addPost} = require("../controllers/postController")
// router.use((req, res, next) => {
//   if (req.session.user) {
//     next();
//   } else {
//     if (req.method.toLowerCase() === "get") {
//       res.redirect(`/`);
//     } else {
//       res.status(401).send(`unauthorized login`);
//     }
//   }
// });

router.get("/logout", logoutUser);
router.get("/", adminHome);
router.get("/:uid", getUserById);
//router.get("/", getUsers);
router.put("/updates/:uid", updateUser);
router.delete("/delete/:uid", deleteUser);
router.post("/post", addPost)


module.exports = router;
