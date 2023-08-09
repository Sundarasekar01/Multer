const mongoose = require('mongoose')

const gallerySchema = mongoose.Schema({
   
    image: {
        type: Array,
        required: true
    }
    
})

module.exports = mongoose.model('gallery', gallerySchema)