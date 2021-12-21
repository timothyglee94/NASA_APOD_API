const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    ImgUrl:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Rating', ratingSchema);