// /search
const express = require('express');
const { runOnChangeOnly } = require('nodemon/lib/config/defaults');
const router = express();

const { searchTrack } = require('../controllers/search'); 

router.get('/search/:value', searchTrack)

module.exports = router;
