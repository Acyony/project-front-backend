const {Schema, model} = require('mongoose');

const answerSchema = new Schema({
    postId: {type: Number, required: true},
    userId: {type: Number, required: true},
    answer: {type: String, required: true, trim: true}
})

module.exports = model('Answer', answerSchema);