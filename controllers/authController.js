const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const login = async(req,res)=>{
    try{
        const {email,password} = req.body

        if(!email || !password){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerida toda la informacion'
            })
        }

        const user = await userModel.getByEmail(email)
        if(!user){
            return res.status(404).json({
                status:'Error',
                mensaje:'No esta registrado el usuario'
            })
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({
                status:'Error',
                mensaje:'Contraseña incorrecta'
            })
        }
        const token = await jwt.sign({id:user.id, email: user.email, names: user.names, rol:user.rol}, process.env.JWT_SECRET,{
            expiresIn:'1y'
        })

        return res.status(200).json({
            status:'Success',
            user,
            token
        })
    }catch(error){
        return res.status(500).josn({
            status:'Error',
            mensaje:'No se pudo iniciar sesion',
            error:error
        })
    }
}

module.exports = {
    login
}
