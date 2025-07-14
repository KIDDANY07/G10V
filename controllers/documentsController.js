const documentsModel = require('../models/documentsModel')
const userModel = require('../models/userModel')
const path = require('path')
const fs = require('fs')

const getAll = async(req,res)=>{
    try{
        const documents = await documentsModel.getAll()
        if(documents.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'No hay documentos registrados'
            })
        }

        return res.status(200).json({
            status:'Success',
            documents
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudieron obtener los documentos',
            error:error
        })
    }
}

const getById = async(req,res)=>{
    try{
        const id = req.params.id
        const documents = await documentsModel.getById(id)
        if(!documents){
            return res.status(404).json({
                status:'Error',
                mensaje:'No hay existen estos documentos'
            })
        }
        return res.status(200).json({
            status:'Success',
            documents
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener los documentos',
            error:error
        })
    }
}

const getByUserName = async(req,res)=>{
    try{
        const name_user = req.params.names
        const documents = await documentsModel.getByUserName(name_user)
        if(!documents){
            return res.status(404).json({
                status:'Error',
                mensaje:'El usuario no ha registrado estos documentos'
            })
        }

        return res.status(200).json({
            status:'Success',
            documents
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener los documentos',
            error:error
        })
    }
}

const createActiveUser = async(req,res)=>{
    try{
        const user = req.user
        const user_id = user.id
        const name_user = user.names

        const files = req.files

        if(!files || !files.document_file || !files.civil_registry || !files.lfb_file){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerida toda la informacion'
            })
        }

        const document_file = files.document_file[0].filename
        const civil_registry = files.civil_registry[0].filename
        const lfb_file = files.lfb_file[0].filename

        const documents = await documentsModel.create(user_id,document_file,civil_registry,lfb_file,name_user)
        return res.status(200).json({
            status:'Success',
            documents
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo crear los documentos',
            error:error
        })
    }
}

const getByUserId = async(req,res)=>{
    try{
        const user_id = req.params.id
        const documents = await documentsModel.getByUserId(user_id)
        if(!documents){
            return res.status(404).json({
                status:'Error',
                mensaje:'Este usuario no tiene registro de documentos'
            })
        }

        return res.status(200).json({
            status:'Success',
            documents
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener los datos',
            error:error
        })
    }
}

const getByUserActive = async(req,res)=>{
    try{
        const user_id = req.user.id
        const documents = await documentsModel.getByUserId(user_id)
        if(!documents){
            return res.status(404).json({
                status:'Error',
                mensaje:'Este usuario no tiene registro de documentos'
            })
        }

        return res.status(200).json({
            status:'Success',
            documents
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener los datos',
            error:error
        })
    }
}

const create = async (req, res) => {
    try {
        const user_id = req.params.id
        const name_user = req.userNames 

        const files = req.files

        if (!files || !files.document_file || !files.civil_registry || !files.lfb_file) {
            return res.status(400).json({
                status: 'Error',
                mensaje: 'Es requerida toda la información: document_file, civil_registry y lfb_file'
            })
        }

        const document_file = files.document_file[0].filename
        const civil_registry = files.civil_registry[0].filename
        const lfb_file = files.lfb_file[0].filename

        const documents = await documentsModel.create(
            user_id,
            document_file,
            civil_registry,
            lfb_file,
            name_user
        )

        return res.status(200).json({
            status: 'Success',
            documents
        })
    } catch (error) {
        return res.status(500).json({
            status: 'Error',
            mensaje: 'No se pudo crear los documentos',
            error
        })
    }
}


const updateActiveUser = async(req,res)=>{
    try{
        const user_id = req.user.id
        const name_user = req.user.names
        const files = req.files

        if(!files || !files.document_file || !files.civil_registry || !files.lfb_file){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerida toda la informacion'
            })
        }

        const currentDocuments = await documentsModel.getByUserId(user_id)
        if(!currentDocuments === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'No tienes documentos registrados'
            })
        }

        const uploadsDir = path.join(__dirname, '..', 'uploads', name_user)

        const filesToDelete = [
            currentDocuments.document_file,
            currentDocuments.civil_registry,
            currentDocuments.lfb_file
        ]

        filesToDelete.forEach(fileName=>{
            const filePath = path.join(uploadsDir, fileName)
            if(fs.existsSync(filePath)){
                fs.unlinkSync(filePath)
            }
        })

        const document_file = files.document_file[0].filename
        const civil_registry = files.civil_registry[0].filename
        const lfb_file = files.lfb_file[0].filename

        const documents = await documentsModel.update(document_file,civil_registry,lfb_file,user_id)

        return res.status(200).json({
            status:'Success',
            documents
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo actualizar los documentos',
            error:error
        })
    }
}


const update = async (req, res) => {
    try {
        const user_id = req.params.id
        const userName = req.userNames 
        console.log(user_id)
        const files = req.files

        if (!files || !files.document_file || !files.civil_registry || !files.lfb_file) {
            return res.status(400).json({
                status: 'Error',
                mensaje: 'Es requerida toda la información: document_file, civil_registry y lfb_file'
            })
        }

        const currentDocuments = await documentsModel.getByUserId(user_id)
        if (currentDocuments.length === 0) {
            return res.status(404).json({
                status: 'Error',
                mensaje: 'No tiene documentos registrados este usuario'
            })
        }

        const uploadsDir = path.join(__dirname, '..', 'uploads', userName)

        const filesToDelete = [
            currentDocuments.document_file,
            currentDocuments.civil_registry,
            currentDocuments.lfb_file
        ]

        filesToDelete.forEach(fileName => {
            if (fileName) {
                const filePath = path.join(uploadsDir, fileName)
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath)
                }
            }
        })

        const document_file = files.document_file[0].filename
        const civil_registry = files.civil_registry[0].filename
        const lfb_file = files.lfb_file[0].filename

        const documents = await documentsModel.update(
            document_file,
            civil_registry,
            lfb_file,
            user_id
        )

        return res.status(200).json({
            status: 'Success',
            documents
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            status: 'Error',
            mensaje: 'No se pudo actualizar los documentos',
            error
        })
    }
}


const deleteDocuments = async (req, res) => {
    try {
        const user_id = req.params.id

        const user = await userModel.getById(user_id)
        if (!user) {
            return res.status(404).json({
                status: 'Error',
                mensaje: 'Usuario no encontrado'
            })
        }

        const documents = await documentsModel.getByUserId(user_id)
        if (!documents) {
            return res.status(404).json({
                status: 'Error',
                mensaje: 'El usuario no tiene documentos registrados'
            })
        }

        const deleted = await documentsModel.deleteDocuments(user_id)

        const userDir = path.join(__dirname, '..', 'uploads', user.names)

        const filesToDelete = [
            documents.document_file,
            documents.civil_registry,
            documents.lfb_file
        ]

        for (const fileName of filesToDelete) {
            if (!fileName) continue 
            const filePath = path.join(userDir, fileName)
            try {
                if (fs.existsSync(filePath)) {
                    await fs.promises.unlink(filePath)
                    console.log(`Archivo eliminado: ${filePath}`)
                } else {
                    console.log(`Archivo no existe: ${filePath}`)
                }
            } catch (error) {
                console.log(`No se pudo eliminar el archivo ${filePath}:`, error.message)
            }
        }

        return res.status(200).json({
            status: 'Success',
            deleted
        })

    } catch (error) {
        console.error('Error en deleteDocuments:', error)
        return res.status(500).json({
            status: 'Error',
            mensaje: 'No se pudo eliminar los documentos',
            error: error.message
        })
    }
}




module.exports = {
    getAll,
    getById,
    getByUserName,
    getByUserActive,
    getByUserId,
    createActiveUser,
    create,
    updateActiveUser,
    update,
    deleteDocuments
}