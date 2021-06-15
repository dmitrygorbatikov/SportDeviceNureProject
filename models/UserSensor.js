const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    speed: {
        type: Number,
        required: true
    },
    impactPower: {
        type: Number,
        required: true
    },
    heart_beat: {
        type: Number,
        required: true,
    },
    timer: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    },
})

module.exports = model('UserSensor', schema)
