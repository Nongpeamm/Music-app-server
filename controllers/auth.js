const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, UserschemaValidate } = require('../models/User');

exports.register = async(req,res) =>{
    const { error } = UserschemaValidate(req.body)

    if(error){
        return res.status(400).send(error.details[0].message)
    }

    try{

        //ดูว่ารับค่าอะไรมาบ้าง
        const {username, password, email} = req.body;
        let user = await User.findOne({username}),  //หาข้อมูล
            mail = await User.findOne({email})

        // ใส่ไว้ให้ไม่ loop
        if(user || mail) {  
            return res.status(400).send('user or email already exists');
        }  
        const salt = await bcrypt.genSalt(10);

        //เพิ่ม user เข้า db
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
        res.status(500).send('server error!')
    }
}

exports.login = async(req,res) =>{
    console.log('login')
    const {username, password} = req.body
    let user = await User.findOneAndUpdate({username},{new: true});   //to update timestamp

    if(user && user.enabled){
        //เทียนตัวที่ส่งมา กับ ตัวใน database
        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log("Password match : " + passwordMatch);

        //รหัสไม่ตรง
        if(!passwordMatch) {
            res.status(400).send("password invalid!!")
        }
        
        // ถ้ารหัสตรงจะเข้า token
        const payload = {
            user:{
                _id: user._id,
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
                            // ส่ง token คู่กับ ตัวของ user 
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

exports.currentUser = async(req,res) => {
    try{
        console.log("hello")
        const user = await User.findOne({username: req.user.username})
        .select('-password').exec();
        console.log("user", user);
        res.send(user)
    }
    catch(err){
        console.log(err)
        res.status(500).send('server error')
    }
}

exports.currentAdmin = async(req,res) => {
    try{
        console.log("hello")
        const user = await User.findOne({username: req.user.username})
        .select('-password').exec();
        console.log("user", user);
        res.send(user)
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