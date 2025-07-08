const express = require('express')
const router = express.Router()
const user = require('../controllers/userController')
const auth = require('../middlewares/auth.middleware.js')
const rol = require('../middlewares/rol.middleware.js')


router.get('/active-user',auth,user.getByUserActive)
router.post('/',auth,user.create)
router.put('/active-user',auth,user.updateByUserActive)


//Roles superiores
router.get('/',auth,rol('Admin','DT','Entrenador'),user.getAll)
router.get('/id/:id',rol('Admin','DT','Entrenador'),auth,user.getById)
router.get('/email/:email',auth,rol('Admin','DT','Entrenador'),user.getByEmail)
router.put('/:id',auth,rol('Admin','DT','Entrenador'),user.updateByAdmin)
router.delete('/:id',auth,rol('Admin','DT','Entrenador'),user.deleteUser)
module.exports = router