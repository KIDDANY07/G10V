const express = require('express')
const router = express.Router()
const user = require('../controllers/userController')
const auth = require('../middlewares/auth.middleware.js')
const rol = require('../middlewares/rol.middleware.js')
const upload = require('../middlewares/upImage.middleware.js')

//Roles deportistas
router.get('/active-user',auth,user.getByUserActive)
router.post('/',user.create)
router.put('/active-user',auth,upload.single('image'),user.updateByUserActive)

///Roles superiores
router.get('/',auth,rol('Admin','DT','Entrenador'),user.getAll)
router.get('/id/:id',rol('Admin','DT','Entrenador'),auth,user.getById)
router.get('/email/:email',auth,rol('Admin','DT','Entrenador'),user.getByEmail)
router.get('/names/:names',auth,rol('Admin','DT','Entrenador'),user.getByNames)
router.put('/:id', auth, rol('Admin','DT','Entrenador'), upload.single('image'), user.updateByAdmin)
router.delete('/:id',auth,rol('Admin','DT','Entrenador'),user.deleteUser)
module.exports = router