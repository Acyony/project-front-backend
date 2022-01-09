const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const logger = require("morgan");
const dotenv = require("dotenv");
const session = require("express-session");
dotenv.config();

//create server app
const app = express();

const userRouter = require("./src/routers/userRouter");
const adminRouter = require("./src/routers/adminRouter");
const Post = require("./src/models/postModel");

// setup session middlewares
app.use(
  session({
    secret: "backend project",
    cookie: { maxAge: 5 * 60 * 1000 },
  })
);

//Informing the express to use the EJS as view engine
app.set("view engine", "ejs");

// Define I want to use static archives
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/forum", async (req, res) => {
    try {
        const posts = await Post.find({});
        return res.render("forum", {posts});
    } catch (err) {
        return res.redirect("/")
    }
});


//db connection
mongoose.connect(process.env.DB_CONNECTION);
const db = mongoose.connection;

db.on("error", () => console.error);
db.once("open", () => console.log("connection established"));

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));

// routers
app.use("/users", userRouter);
app.use("/admin", adminRouter);

//port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server up and running on port:", port);
});
