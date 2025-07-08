const competencieModel = require('../models/competenciesModel')

const getAll = async(req,res)=>{
    try{
        const competencies = await competencieModel.getAll()
        if(competencies.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'No hay competencias disponibles'
            })
        }
        return res.status(200).json({
            status:'Success',
            competencies
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudieron obtener las competencias',
            error:error
        })
    }
}

const getById = async(req,res)=>{
    try{
        const id = req.params.id
        const competencie = await competencieModel.getById(id)
        if(!competencie){
            return res.status(404).json({
                status:'Error',
                mensaje:'No existe esta competencia'
            })
        }

        return res.status(200).json({
            status:'Success',
            competencie
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener la competencia',
            error:error
        })
    }
}

const getByName = async(req,res)=>{
    try{
        const name = req.params.name
        const competencie = await competencieModel.getByName(name)
        if(!competencie){
            return res.status(404).json({
                status:'Error',
                mensaje:'No existe esta competencia'
            })
        }

        return res.status(200).json({
            status:'Success',
            competencie
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener la competencia',
            error:error
        })
    }
}

const getByCategory = async(req,res)=>{
    try{
        const category = req.params.category
        const competencie = await competencieModel.getByCategory(category)
        if(!category){
            return res.status(404).json({
                status:'Error',
                mensaje:'No existen competencias con estas categorias'
            })
        }

        return res.status(200).json({
            status:'Success',
            competencie
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener la competencia',
            error:error
        })
    }
}

const getByStatus = async(req,res)=>{
    try{
        const status = req.params.status
        const competencie = await competencieModel.getByStatus(status)
        if(!competencie){
            return res.status(404).json({
                status:'Error',
                mensaje:'No existen competencias con este estado'
            })
        }

        return res.status(200).json({
            status:'Success',
            competencie
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener la competencia',
            error:error
        })
    }
}

const create = async(req,res)=>{
    try{
        const {name,category,status,description} = req.body
        if(!name || !category || !status || !description){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerida toda la informacion'
            })
        }

        const competencie = await competencieModel.create(name,category,status,description)
        return res.status(200).json({
            status:'Success',
            competencie
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo crear la competencia',
            error:error
        })
    }
}

const updateCompetencie = async(req,res)=>{
    try{
        const id = req.params.id
        const {name,category,status,description} = req.body
        if(!name || !category || !status || !description){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerida toda la informacion'
            })
        }
        const existsCompetencie = await competencieModel.getById(id)
        if(!existsCompetencie){
            return res.status(404).json({
                status:'Error',
                mensaje:'No existe la competencia'
            })
        }
        const competencie = await competencieModel.updateCompetencie(name,category,status,description,id)
        return res.status(200).json({
            status:'Success',
            competencie
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo crear la competencia',
            error:error
        })
    }
}

const deleteCompetencie = async(req,res)=>{
    try{
        const id = req.params.id
        const competencie = await competencieModel.deleteCompetencie(id)
        if(!competencie){
            return res.status(404).json({
                status:'Error',
                mensaje:'No existe esta competencia'
            })
        }
        return res.status(200).json({
            status:'Success',
            competencie
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo eliminar la competencia',
            error:error
        })
    }
}

module.exports = {
    getAll,
    getById,
    getByName,
    getByCategory,
    getByStatus,
    create,
    updateCompetencie,
    deleteCompetencie
}