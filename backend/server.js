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


//cross_origin(allow_headers=['Content-Type'])
// autorise seul les client qui fait les requête
// const corsOptions = {
//     origin: process.env.CLIENT_URL,
//     credentials: true,
//     'allowedHeaders': ['sessionId', 'Content-Type'],
//     'exposedHeaders': ['sessionId'],
//     'methods': 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS',
//     'preflightContinue': false,
//     Accept: 'application/json',
//     'Content-type': 'application/json',
//    }
// app.use(cors(corsOptions)); 
// app.use(
//     cors({
//       origin: (origin, callback) => callback(null, true),
//       credentials: true,
//     })
//   );
  


//app.use(cors({  origin: "http://localhost:3000", credentials: true }));
app.use(cors());
//activation cors 
app.use(function(req, res, next) {

  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Credentials',true);
   res.header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
  res.header("Access-Control-Allow-Headers",  "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.header("Access-Control-Expose-Headers","Authorization")
  next();
});



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