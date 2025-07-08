const express = require('express')
const router = express.Router()
const competencie = require('../controllers/competenciesController')
const auth = require('../middlewares/auth.middleware')
const rol = require('../middlewares/rol.middleware')

//Roles deportista
router.get('/',auth,competencie.getAll)
router.get('/id/:id',auth,competencie.getById)
router.get('/name/:name',auth,competencie.getByName)
router.get('/category/:category',auth,competencie.getByCategory)
router.get('/status/:status',auth,competencie.getByStatus)

//Roles Superiores
router.post('/',auth,rol('Admin','Entrenador','DT'),competencie.create)
router.put('/:id',auth,rol('Admin','Entrenador','DT'),competencie.updateCompetencie)
router.delete('/:id',auth,rol('Admin','Entrenador','DT'),competencie.deleteCompetencie)

module.exports = router