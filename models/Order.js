const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
    },
    user_surname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    city:{
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    productId:{
        type: String,
        required: true,
    },
    product_name: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    orderDateTime:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Order', schema)
