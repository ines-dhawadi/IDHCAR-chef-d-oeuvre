const jwt = require('jsonwebtoken')
const UserModel =require('../client/userModel')


module.exports={


    // test si user et connect
    checkUser : (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          res.cookie("jwt", "", { maxAge: 1 });
          next();
        } else {
          let user = await UserModel.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  },

// token correspond a quelqu'un dans bd
// pour que l'utilisateur ne se connecter chaque fois
// =>  se reconnaît automatiquement
requireAuth: (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.send(200).json('no token')
        } else {
          console.log(decodedToken.id);
          next();
        }
      });
    } else {
      console.log('No token');
    }
  }



}
  