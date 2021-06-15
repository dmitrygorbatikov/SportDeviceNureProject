const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    info: {
        type: Array,
        required: true,
    },
    regDateTime:{
        type: String,
        required: true,
        default: new Date().toLocaleString('ru',
            {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: "numeric",
                minute: "numeric"
            })
    }
})

module.exports = mongoose.model('Product', schema)
