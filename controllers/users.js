const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../models/User');
const { Song } = require('../models/Song');

exports.listUser = async(req,res) =>{
    try{
        const user = await User.find({}).select('-password').exec();
        res.send(user);
    }
    catch(err){
        console.log(err)
        res.status(500).send('server error')
    }
}

exports.readUser = async(req,res) =>{
    try{
        const id = req.params.id
        const user = await User.findOne({_id:id}).select('-password').exec();
        res.send(user);
    }
    catch(err){
        console.log(err)
        res.status(500).send('server error')
    }
}
exports.getUser = async(req,res) =>{
    try{
        console.log("USER: " + req.user._id)
        const user = await User.findOne({_id: req.user._id}).select('-password').exec();
        const song = await Song.find({_id: user.favourite})
        // const user = await User.findOne({username: name}).select('-password').exec();
        res.send({user, song})
    }
    catch(err){
        console.log(err)
        res.status(500).send('server error')
    }
}

exports.updateUser = async(req,res) =>{
    try{
        let {id, password} = req.body.values

        const salt = await bcrypt.genSalt(10);
        let enpassword = await bcrypt.hash(password, salt);

        const user = await User.findOneAndUpdate(
            { _id: id }, 
            {password: enpassword});

        res.send('updateUser');
    }
    catch(err){
        console.log(err)
        res.status(500).send('server error')
    }
}

exports.removeUser = async(req,res) =>{
    try{
        const id = req.params.id
        const user = await User.findOneAndDelete({_id:id});
        res.send(`removeUser : ${user.username}`);
    }
    catch(err){
        console.log(err)
        res.status(500).send('server error')
    }
}

exports.changeStatus = async(req,res) =>{
    try{
        // console.log(req.body.enabled)
        const user = await User.findOneAndUpdate(
            { _id: req.body.id }, 
            {enabled: req.body.enabled});
        res.send(user);
    }
    catch(err){
        console.log(err)
        res.status(500).send('server error')
    }
}

exports.changeRole = async(req,res) =>{
    try{
        // console.log(req.body.enabled)
        const user = await User.findOneAndUpdate(
            { _id: req.body.id }, 
            {role: req.body.role});
        res.send(user);
    }
    catch(err){
        console.log(err)
        res.status(500).send('server error')
    }
}