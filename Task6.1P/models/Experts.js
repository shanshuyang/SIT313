const mongoose = require("mongoose");
const internal = require("stream");
const expertSchema = new mongoose.Schema(
    {
        expert_name: {
            type: String,
            required: 'Please enter your task name'
        },
        _id: {
            type: String,
            required: 'Please enter a id'
        },
        expert_password: {
            type: String,
            required: 'Please enter your password'
        },
        expert_address: {
            type: String,
            required: 'Please enter your address'
        },
        expert_phone: {
            type: String,
            required: 'Please enter your phone number'
        }
    }
)

module.exports = mongoose.model("Expert", expertSchema);