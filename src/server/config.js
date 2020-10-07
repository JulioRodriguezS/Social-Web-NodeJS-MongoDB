const path = require('path')
const expresshbs = require('express-handlebars')
const express = require('express')

const morgan = require('morgan')
const multer = require('multer')
module.exports = (app)=>{
    //settings 
    app.set('port',process.env.PORT || 3000)
    const port = app.get('port')
    app.set('views', path.join(__dirname,'views'))
    app.engine('.hbs',expresshbs({
        defaultLayout:'main',
        partialsDir:path.join(app.get('views'),'partials'),
        layOutsDir: path.join(app.get('views'),'layouts'),
        extname:'.hbs',
        helpers:require('./helpers')
    }))
    app.set('view engine', '.hbs')

    //middlewares
    app.use(morgan('dev'))
    app.use(multer({
        dest:path.join(__dirname,'../public/upload/temp')
    }).single('image'))
    app.use(express.urlencoded({extended:false}))
    app.use(express.json())
    //routes

    //errorhandlers

    app.listen(port,()=>{
        console.log('server listen on port ', port)
    })        
    return app
}