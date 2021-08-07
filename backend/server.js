const express=require('express')
const app = express()
const cors = require('cors')
const body = require("body-parser");
const db = require('./config/db')


// appl config
db();

// appel cors
app.use( body.json() ); 
app.use(express.json());
app.use(cors())
// importation router
const artisanRouter = require('./artisan/artisanRouter');
 const clientRouter = require('./client/clientRoute')
 const commenterRouter = require('./commenter/commentaireRouter')

// use router
app.use('/idhcar/artisan',artisanRouter)
 app.use('/idhcar/client',clientRouter)
app.use('/idhcar/commenter',commenterRouter)






//IMPORTATION POERT .ENV
const PORT = process.env.PORT || '5000'

// configuration server

app.listen(PORT,(err)=>{
    if(err){
        console.log('server is not runing')
    }else{
console.log(`server is running on port ${PORT}`)
    }
})