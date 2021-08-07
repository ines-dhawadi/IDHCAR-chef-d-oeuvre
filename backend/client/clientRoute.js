const express=require('express')
const router = express.Router()
const clientController = require('./clientController')


router.get('/getAllClient', clientController.getAllUsers)
router.get('/getClient/:id', clientController.getUser)
router.post('/add', clientController.addUser)
router.delete('/:id/delete', clientController.deleteUser)
router.put('/:id/update', clientController.updateUser)


module.exports = router