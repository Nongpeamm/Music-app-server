const express = require('express')  //normal server
const cors = require('cors')    //API manage
const bodyParser = require('body-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')

const {readdirSync} = require('fs') //ดึงไฟล์เข้ามาใช้ได้เลย 

require('dotenv').config();
const connectDB = require('./config/db');

const app = express();

//connect to database
connectDB()

//middleware
app.use(morgan('dev'))

app.use(bodyParser.json({limit: '20mb'})); //ควบคุมการรับส่งข้อมูล req.body 

app.use(cors());    //คุึง api

//route
readdirSync('./routes').map((router) => {      // readdirSync('FILE PATH').map((VALUE) 
    app.use('/', require('./routes/' + router))    // part ที่ได้จะเริ่มด้วย / + ...
})

const port = process.env.PORT //รับจาก env 
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})
