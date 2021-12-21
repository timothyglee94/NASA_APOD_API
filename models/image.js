const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    ImgUrl:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Image', imageSchema);