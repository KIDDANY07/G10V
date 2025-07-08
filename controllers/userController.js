const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()



const getAll = async(req,res)=>{
    try{
        const users = await userModel.getAll()
        if(users.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'No existen usuarios registrados'
            })
        }

        return res.status(200).json({
            status:'Success',
            users
        })
    }catch(error){  
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener los usuarios',
            error:error
        })
    }
}


const getById = async(req,res)=>{
    try{
        const id = req.params.id
        const user = await userModel.getById(id)

        if(!user){
            return res.status(404).json({
                status:'Error',
                mensaje:'El usuario no existe'
            })
        }

        return res.status(200).json({
            status:'Success',
            user
        })
    }catch(error){  
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener el usuario',
            error:error
        })
    }
}

const getByUserActive = async(req,res)=>{
    try{
        const id = req.user.id
        const user = await userModel.getById(id)
        if(!user){
            return res.status(404).json({
                status:'Error',
                mensaje:'Usuario no encontrado'
            })
        }

        return res.status(200).json({
            status:'Success',
            user
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener la informacion',
            error:error
        })
    }
}

const getByEmail = async(req,res)=>{
    try{
        const email = req.params.email
        const user = await userModel.getByEmail(email)
        if(!user){
            return res.status(404).json({
                status:'Error',
                mensaje:'El usuario no existe'
            })
        }

        return res.status(200).json({
            status:'Success',
            user
        })
    }catch(error){  
        console.log(error)
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener el usuario',
            error:error
        })
    }
}

const create = async(req,res)=>{
    try{
        const {names,email,password,document,type_document,rol} = req.body
        if(!names || !email || !password || !document || !type_document || !rol){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerida toda la informacion'
            })
        }

        const emailExists = await userModel.getByEmail(email)
        if(emailExists){
            return res.status(409).json({
                status:'Error',
                mensaje:'Correo ya registrado'
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await userModel.create(names,email,hashedPassword,document,type_document,rol)
        return res.status(200).json({
            status:'Success',
            user
        })
    }catch(error){  
        console.log(error)
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo crear el usuario',
            error:error
        })
    }
}


const updateByUserActive = async(req,res)=>{
    try{
        const id = req.user.id
        const {age,date_birth,stature,weight,position} = req.body
        if(!age || !date_birth || !stature || !weight || !position){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerida toda la informacion'
            })
        }

        const user = await userModel.update(age,date_birth,stature,weight,position,id)
        return res.status(200).json({
            status:'Success',
            user
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo actualizar el usuario',
            error:error
        })
    }
}

const updateByAdmin = async(req,res)=>{
    try{
        const id = req.params.id
        const {age,date_birth,stature,weight,position} = req.body
        if(!age || !date_birth || !stature || !weight || !position){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerida toda la informacion'
            })
        }


        const user = await userModel.update(age,date_birth,stature,weight,position,id)
        return res.status(200).json({
            status:'Success',
            user
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo actualizar el usuario',
            error:error
        })
    }
}


const deleteUser = async(req,res)=>{
    try{
        const id = req.params.id
        const user = await userModel.deleteUser(id)
        if(!user){
            return res.status(404).json({
                status:'Error',
                mensaje:'No existe el usuario'
            })
        }

        return res.status(200).json({
            status:'Success',
            user
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo eliminar el usuario',
            error:error
        })
    }
}

module.exports = {
    getAll,
    getById,
    getByUserActive,
    getByEmail,
    create,
    updateByUserActive,
    updateByAdmin,
    deleteUser
}