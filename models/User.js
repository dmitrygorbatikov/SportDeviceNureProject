const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
    },
    regDateTime:{
        type: String,
        default: new Date().toLocaleString('ru',
            {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: "numeric",
                minute: "numeric"
            })
    },
    hasTeam: {
        type: Boolean,
        required: true,
        default: false
    },
    user_img: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', schema)
