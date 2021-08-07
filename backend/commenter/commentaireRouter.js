const express = require('express')
const router = express.Router()
 const Testimony = require('./commenterController');

 // add Testimony 
 router.post('/addTestimony',Testimony.addTestimony)
 // get all Testimonys
 router.get('/getAllTestimonys',Testimony.getAllTestimonys)
 //delete Testimony
 router.delete('/deleteTestimony/:id',Testimony.deleteTestimony)
 //update Testimony 
 router.put('/updateTestimony/:id',Testimony.updateTestimonys)
 // get one Testimony
 router.get('/getTestimony/:id',Testimony.getTestimony)


 module.exports = router