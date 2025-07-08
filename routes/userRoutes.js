const express = require('express')
const router = express.Router()
const user = require('../controllers/userController')
const auth = require('../middlewares/auth.middleware.js')
const rol = require('../middlewares/rol.middleware.js')

router.get('/',auth,user.getAll)
router.get('/id/:id',auth,user.getById)
router.get('/email/:email',auth,user.getByEmail)
router.post('/',auth,user.create)
router.put('/active-user',auth,user.updateByUserActive)
router.put('/:id',auth,rol('Admin'),user.updateByAdmin)
router.delete('/:id',auth,rol('Admin'),user.deleteUser)


module.exports = router