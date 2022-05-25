const express = require('express');
const { runOnChangeOnly } = require('nodemon/lib/config/defaults');
const router = express();

const {register, login, listUser, editUser, deleteUser, currentUser, currentAdmin} = require('../controllers/auth');

//middleware
const { auth, adminCheck } = require('../middleware/auth');

// method GET AUTH
//http://localhost:4000/api/auth
router.get('/api/auth', listUser)

// method POST AUTH register
//http://localhost:4000/register
router.post('/register', register)

// method POST AUTH login
//http://localhost:4000/login
router.post('/login',login)

// method POST AUTH login (private)
//http://localhost:4000/login
router.post('/current-user', auth, currentUser)

// method POST AUTH login (private)
//http://localhost:4000/login
router.post('/current-admin', auth, adminCheck, currentAdmin)

// method get from headers POST to check authentication 
router.get('/1',auth,(req,res) => {
    res.send('hello 1');
})
//method UPDATE PUSH auth
//http://localhost:4000/api/auth
router.put('/api/auth', editUser)

//method DELETE AUTH
//http://localhost:3000/api/auth
router.delete('/api/auth', deleteUser)






module.exports = router;