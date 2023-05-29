const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const app = express();
const router = require('./routes/index')
app.use(express.json())
app.use(express.urlencoded({ extended : true}))
app.use(cors())
app.use('/api' , router)

module.exports = app