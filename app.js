const express = require('express')
const router = express.Router()
const app = express()
const mongoose = require('mongoose')
const expressEjsLayout = require('express-ejs-layouts')

mongoose.connect('mongodb://localhost/test',{useNewUrlParser: true, useUnifiedTopology : true})
.then(() => console.log('App Connected!'))
.catch((err)=> console.log(err))

app.set('view engine','ejs')
app.use(expressEjsLayout)

app.use(express.urlencoded({extended : false}))


app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))

app.listen(3000)