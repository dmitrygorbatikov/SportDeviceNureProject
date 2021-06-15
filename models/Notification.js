const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
    },
    leader: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true,
    },
    team: {
        type: String,
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

module.exports = mongoose.model('Notification', schema)
