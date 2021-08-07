const express =require('express')
const router = express.Router()
const artisonController=require('./artisanController'); 


router.get('/get',artisonController.getArtisan)
router.post('/add', artisonController.addArtisan)
router.delete('/:id/delete/',artisonController.deleteArtisan)
router.put('/:id/update',artisonController.updateArtisan)

module.exports = router
