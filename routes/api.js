const express = require('express');
const { runOnChangeOnly } = require('nodemon/lib/config/defaults');
const router = express();
const {register, login, listUser, editUser, deleteUser} = require('../controllers/auth');
const {auth} = require('../middleware/auth');

// method GET AUTH
router.get('/api/auth', listUser)
// method POST AUTH register
router.post('/register', register)
// method POST AUTH login
router.post('/login',login)
// method get from headers POST to check authentication 
router.get('/1',auth,(req,res) => {
    res.send('hello 1');
})
//method UPDATE PUSH auth
router.put('/api/auth', editUser)
//method DELETE AUTH
router.delete('/api/auth', deleteUser)






module.exports = router;