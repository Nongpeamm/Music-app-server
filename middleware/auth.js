const jwt = require('jsonwebToken');
const { User } = require('../models/User');

//next check to pass or not
exports.auth = (req,res,next) => {
    try{
        //check token from header!!
        const token = req.headers['authtoken'];

        //check that user have token or not
        if(!token){
            return  res.status(401).send('No token, authorization denied');
        }


        const decoded = jwt.verify(token, 'jwtSecret')
        //ให้ตัวถูกส่งไปให้เก็บเป็น ตัวจาก middleware 
        req.user = decoded.user;
        console.log('middleware', decoded)
        next(); 
    }
    catch(err){
        console.log(err)
        res.status(401).send('Token Invalid');
    }
}
exports.adminCheck = async(req,res,next) => {
    try{
        const { username } = req.user
        const adminUser = await User.findOne({ username: username }).exec();  //หาข้อมูล admin user
        if(adminUser.role !== 'admin'){
            res.status(403).send(err, 'You not Admin, Access denied.');
        }
        else{
            next();  
        }
        
    }
    catch(err){
        console.log(err)
        res.status(401).send('You not Admin, Access denied.');
    }
}