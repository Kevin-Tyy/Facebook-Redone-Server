const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const app = express();
const router = require('../routes/index')

app.use(express.json({limit : '30mb'}))
app.use(express.urlencoded({ extended : true , limit : '30mb'}))
app.use(cors())
app.use('/api' , router)

module.exports = app