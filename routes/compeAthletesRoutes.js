const express = require('express')
const router = express.Router()
const compeAthletesController = require('../controllers/compeAthletesController')
const auth = require('../middlewares/auth.middleware')
const rol = require('../middlewares/rol.middleware')

//Roles deportista
router.get('/active-user',auth, compeAthletesController.getByActiveUser)
router.post('/',auth,compeAthletesController.createActiveUser)

//Roles superiores
router.get('/',auth,rol('Admin','DT','Entrandor'), compeAthletesController.getAll)
router.get('/id/:id',auth,rol('Admin','DT','Entrandor'), compeAthletesController.getById)
router.get('/user/:id',auth,rol('Admin','DT','Entrandor'), compeAthletesController.getByUserId)
router.get('/username/:userName',auth,rol('Admin','DT','Entrandor'), compeAthletesController.getByUserName)
router.get('/competency/:competency_name',auth,rol('Admin','DT','Entrandor'), compeAthletesController.getByCompetencyName)
router.get('/status/:status',auth,rol('Admin','DT','Entrandor'), compeAthletesController.getByCompetencyStatus)
router.post('/:id',auth,rol('Admin','DT','Entrandor'),compeAthletesController.create)
router.delete('/:id',auth,rol('Admin','DT','Entrandor'),compeAthletesController.deleteUserOfCompetency)


module.exports = router