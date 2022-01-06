const {Schema, model} =require('mongoose');

const userSchema = new Schema({
    fullName: {type: String, required: true, trim: true},
    userName: {type: String, required: true, trim: true, unique: true},
    email: {type: String, required: true, trim: true, unique: true},
    password: {type: String, required: true, trim: true},
})

module.exports = model('User', userSchema)