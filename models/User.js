const mongoose = require('mongoose')
const joi = require('joi')

const Userschema= new mongoose.Schema({
    // user object
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user', // all new member will set to user 
    },
    enabled: { 
        type: Boolean,
        default: true,
    },
    favourite: { 
        type: [String], 
        default: [] 
    }
    },
    { timestamps: true }
);

// Validate
const UserschemaValidate = (data) => {
    const schema = joi.object({
        username: joi.string().max(20).required(),
        password: joi.string().min(6).required(),
        email: joi.string().email().required()
    })
    return schema.validate(data)
}

const User = mongoose.model('usertable',Userschema);
module.exports = {User, UserschemaValidate}