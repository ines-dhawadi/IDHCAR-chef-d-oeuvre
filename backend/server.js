const express=require('express')
require('dotenv').config({path: './env'})
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const db = require('./config/db')
const { checkUser,requireAuth}=require('./middleware/authMiddleware')

// appl config
db();

// autorise seul les client qui fait les requête
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }
  app.use(cors(corsOptions));

// appel cors
app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

app.use(cookieParser())

//jwt => chaq f check token => assur securt de notr utilisat
app.get('*',checkUser);
app.get('/jwtid',requireAuth,(req, res) => {
    res.status(200).send(res.locals.user._id)
  })


// importation router
const artisanRouter = require('./artisan/artisanRouter');
 const clientRouter = require('./client/clientRoute')
 const commenterRouter = require('./commenter/commentaireRouter')
const userRoutes =require('./client/userRoute');
const postRoutes = require('./commenter/postRoute')

// use router
app.use('/idhcar/artisan',artisanRouter)
 app.use('/idhcar/client',clientRouter)
app.use('/idhcar/commenter',commenterRouter)
app.use('/idhcar/user',userRoutes)
app.use('/idhcar/post',postRoutes)






//IMPORTATION POERT .ENV
const PORT = process.env.PORT 

// configuration server

app.listen(PORT,(err)=>{
    if(err){
        console.log('server is not runing')
    }else{
console.log(`server is running on port ${PORT}`)
    }
})