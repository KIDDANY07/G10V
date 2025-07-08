const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = async(req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.status(403).json({
            status:'Error',
            mensaje:'Token requerido'
        })
    }

    const token = authHeader.split(' ')[1]
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    }catch(error){
        return res.status(403).json({
            status:'Error',
            mensaje:'El token expiro o es invalido'
        })
    }
}


module.exports = auth