const express = require('express')
const router = express.Router()
const documentsController = require('../controllers/documentsController')
const auth = require('../middlewares/auth.middleware')
const rol = require('../middlewares/rol.middleware')
const upFiles = require('../middlewares/upFiles.middleware')

//Roles deportistas
router.post('/active-user',auth,upFiles.fields([{ name: 'document_file', maxCount: 1 },{ name: 'civil_registry', maxCount: 1 },{ name: 'lfb_file', maxCount: 1 }]),documentsController.createActiveUser)
router.put('/active-user',auth,upFiles.fields([{ name: 'document_file', maxCount: 1 },{ name: 'civil_registry', maxCount: 1 },{ name: 'lfb_file', maxCount: 1 }]),documentsController.updateActiveUser)
router.get('/active-user',auth,documentsController.getByUserActive)
//Role superiores
router.get('/',auth,rol('Admin', 'DT', 'Entrenador', 'Directivo'),documentsController.getAll)
router.get('/id/:id',auth,rol('Admin', 'DT', 'Entrenador', 'Directivo'),documentsController.getById)
router.get('/names/:names',auth,rol('Admin', 'DT', 'Entrenador', 'Directivo'),documentsController.getByUserName)
router.post('/:id',auth,auth,upFiles.fields([{ name: 'document_file', maxCount: 1 },{ name: 'civil_registry', maxCount: 1 },{ name: 'lfb_file', maxCount: 1 }]),rol('Admin', 'DT', 'Entrenador'),documentsController.create)
router.put('/:id',auth,auth,upFiles.fields([{ name: 'document_file', maxCount: 1 },{ name: 'civil_registry', maxCount: 1 },{ name: 'lfb_file', maxCount: 1 }]),rol('Admin', 'DT', 'Entrenador'),documentsController.updateActiveUser)
router.delete('/:id',auth,rol('Admin', 'DT', 'Entrenador'),documentsController.deleteDocuments)

module.exports = router