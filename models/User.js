const mongoose = require('mongoose')

const Userschema= new mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    role: {
        type: String,
        default: 'user', //admin
    },
    enabled: { 
        type: Boolean,
        dafault: false,
    },
    },
    {timestamps: true}
);

module.exports = User = mongoose.model('usertable',Userschema);