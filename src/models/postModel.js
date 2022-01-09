const {Schema, model} = require('mongoose');

const postSchema = new Schema({
    title: {type: String, required: true, trim: true},
    description: {type: String, required: true, trim: true},
    category: {type: String, required: true, default: 'N/A', enum: ['HTML', 'CSS', 'JavaScript','Other', 'N/A' ]}
})

module.exports = model('Post', postSchema);