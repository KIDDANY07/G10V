const userModel = require('../models/userModel') 

const setUserNames = async (req, res, next) => {
    try {
        const user_id = req.params.id
        const user = await userModel.getById(user_id)
        if (!user) {
            return res.status(404).json({
                status: 'Error',
                mensaje: 'Usuario no encontrado'
            })
        }
        req.userNames = user.names
        next()
    } catch (error) {
        return res.status(500).json({
            status: 'Error',
            mensaje: 'Error obteniendo el nombre de usuario',
            error
        })
    }
}

module.exports = setUserNames
