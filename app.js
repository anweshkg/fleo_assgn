const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');



const app = express();
app.use(bodyParser.json());
app.use(cors());


const connectDB = require('./config/db');
// Load Config
dotenv.config({path: './config/config.env'})


connectDB();
// Routes
app.use('/', require('./routes/index')); 

app.listen(3000);
