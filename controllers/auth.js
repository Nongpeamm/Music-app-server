const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async(req,res) =>{
    try{
        //check user
        const {username, password, email} = req.body;
        let user = await User.findOne({username}),
            mail = await User.findOne({email})

        if(user || mail) {
            return res.status(400).send('user or email already exists');
        }  
        const salt = await bcrypt.genSalt(10);

        user = new User({
            username,
            password,
            email,
        });
        //encrypt password
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        
        res.send('register success');
    }
    catch(err){
        console.log(err)
        res.status(500).send('server error')
    }
}

exports.login = async(req,res) =>{
    const {username, password} = req.body
    let user = await User.findOneAndUpdate({username},{new: true});   //to update timestamp

    if(user){
        //เทียนตัวที่ส่งมา กับ ตัวใน database
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(passwordMatch);
        if(!passwordMatch) {
            res.status(400).send("password invalid!!")
        }
        
        const payload = {
            user:{
                username: user.username,
                role: user.role,
            }
            
        }
        //token generate
        jwt.sign(   payload,
                    "jwtSecret",
                    {expiresIn: 3600}, 
                    (err,token) =>{
                        if(err){
                            throw err;
                        }
                        else{
                            res.json({token,payload})
                        }
                    })

    }
    else{
        return res.status(400).send('user not found!');
    }

    try{
        console.log(req.body)
        
    }
    catch(err){
        console.log(err)
        res.status(500).send('server error')
    }
}
exports.listUser = async(req,res) =>{
    try{
        res.send('list get user');
    }
    catch(err){
        console.log(err)
        res.status(500).send('server error')
    }
}

exports.editUser = async(req,res) =>{
    try{
        res.send('this is edit page')
    }
    catch(err){
        console.log(err)
        res.status(500).send('server error')
    }
}

exports.deleteUser = async(req,res) =>{
    try{
        res.send('delete page')
    }
    catch(err){
        console.log(err)
        res.status(500).send('server error')
    }
}