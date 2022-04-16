const mongoose = require('mongoose')
const subscriberSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subscriberToChannel: {
        type: String,
        required: true
    },
    subscriberDate: {
        type: Date,
        default: Date.now
    }   
})
module.exports = mongoose.model('Subscriber', subscriberSchema)

