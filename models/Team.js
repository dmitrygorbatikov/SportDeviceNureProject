const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    team_name: {
        type: String,
        required: true
    },
    leader: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        default: ""
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
    users: {
        type: Array,
        required: false,
    },
})

module.exports = mongoose.model('Team', schema)
