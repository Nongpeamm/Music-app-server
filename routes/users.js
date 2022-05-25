const express = require('express');
const { runOnChangeOnly } = require('nodemon/lib/config/defaults');
const router = express();

//controller
const {listUser, readUser, updateUser, removeUser, changeStatus, changeRole, getUser} = require('../controllers/users') ;


//middleware
const { auth, adminCheck } = require('../middleware/auth');

// method GET
//http://localhost:4000/users (private)
router.get('/users', auth, adminCheck, listUser);
// method GET
//http://localhost:4000//users:id (private)
router.get('/users/:id', auth, adminCheck, readUser);
// method PUT
//http://localhost:4000/users (private)
router.put('/users/:id', auth, adminCheck, updateUser);
// method DELETE
//http://localhost:4000/users (private)
router.delete('/users/:id', auth, adminCheck, removeUser);

// method GET
//http://localhost:4000/change-status (private)
router.post('/change-status', auth, adminCheck, changeStatus);

// method GET
//http://localhost:4000/change-role (private)
router.post('/change-role', auth, adminCheck, changeRole);

router.get('/getUser', auth, getUser);


module.exports = router;