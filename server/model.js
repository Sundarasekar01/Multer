const mongoose = require('mongoose')

const gallerySchema = mongoose.Schema({
   
    image: {
        type: Array,
        required: true
    },
    title:{
        type: String,
        required: true
    }
    
})

module.exports = mongoose.model('gallery', gallerySchema)