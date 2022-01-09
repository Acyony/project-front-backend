const Post = require('../models/postModel');
const {validationResult} = require("express-validator");

/*add a new post*/
async function addPost(req, res, next) {
    console.log("You add a new post!");

    //handle the error

    try {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return res.status(400).send(err)
        }

        const {title, description, category} = req.body;

        const result = await Post.create({
            title,
            description,
            category
        })

        res.status(200).send(result)

    } catch (err) {
        console.log(err);
        err.status(500);
        next(err);
    }

}



module.exports = { addPost}