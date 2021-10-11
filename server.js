const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const register=require('./routes/register')
const login=require('./routes/login')
const add=require('./routes/add')
const remove= require('./routes/remove')
const favourite= require('./routes/favourite')
const dotenv = require('dotenv')
const app = express()
dotenv.config()

app.use(bodyParser.json());


mongoose.connect(process.env.DB_CONNECT, (err) => {
    if(err)
    console.log(err)
    else
    console.log('db connected')
})

app.use('/register',register)

app.use('/login',login)

app.use('/add',add)

app.use('/remove',remove)

app.use('/favourite',favourite)

app.listen(5000, () => {
    console.log('Server running')
})
