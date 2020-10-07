const mongoose = require('mongoose')
require('dotenv/config')

mongoose.connect(process.env.DB_CONNECTION,{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then((response)=>{
    console.log('DB CONNECTION SUCCESSFULLY')
}).catch((error)=>{
    console.log('ERROR IN DBCONNECTION ',err)
})
