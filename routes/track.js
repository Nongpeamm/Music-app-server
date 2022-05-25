const express = require('express');
const { runOnChangeOnly } = require('nodemon/lib/config/defaults');
const router = express();
const { addTrack, getAlltrack, edittrack, deletetrack, updatefavtrack, gettrack } = require('../controllers/song')
const { auth, adminCheck } = require('../middleware/auth');

router.post('/add/track',auth,adminCheck, addTrack)

router.get('/list/track', getAlltrack)

router.get('/getTrack/:id', gettrack) 

router.put('/edit/track/:id', auth,adminCheck, edittrack)

router.put('/fav/track/:id', auth,updatefavtrack )

router.delete('/delete/track/:id',auth,adminCheck, deletetrack)

module.exports = router;