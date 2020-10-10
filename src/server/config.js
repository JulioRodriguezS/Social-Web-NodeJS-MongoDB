const path = require('path')
const expresshbs = require('express-handlebars')
const errorhandlers = require('errorhandler')
const express = require('express')

const morgan = require('morgan')
const multer = require('multer')

const routes = require('../routes/index')

module.exports = (app)=>{
    //static files
    app.use('/public', express.static(path.join(__dirname, '../public')))

    //settings 
    app.set('port',process.env.PORT || 3000)
    const port = app.get('port')
    app.set('views', path.join(__dirname,'../views'))
    app.engine('.hbs',expresshbs({
        defaultLayout: 'main',
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        extname:'.hbs',
        helpers:require('./helpers')
    }))
    app.set('view engine', '.hbs')

    //middlewares
    app.use(morgan('dev'))
    app.use(multer({dest: path.join(__dirname,'../public/upload/temp')}).single('sbmtImage'))
    app.use(express.urlencoded({extended:false}))
    app.use(express.json())

    //routes
    routes(app, express)

    //errorhandlers
    if(app.get('env') === "develpment"){
        app.use(errorhandlers)
    }

    //server listening
    app.listen(port,()=>{
        console.log('server listen on port ', port)
    })

    return app
}