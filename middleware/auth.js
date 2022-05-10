const jwt = require('jsonwebToken');

exports.auth = (req,res,next) => {
    try{
        const token = req.headers['authtoken'];

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
        res.status(401).send('token invalid');
    }
}