const competencieAthletesModel = require('../models/competenciesAthletesModel')
const competenciesModel = require('../models/competenciesModel')

const getAll = async(req,res)=>{
    try{ 
        const competencies = await competencieAthletesModel.getAll()
        if(competencies.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'No hay competencias registradas'
            })
        }
        return res.status(200).json({
            status:'Success',
            competencies
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudieron obtener los datos de competencias y deportistas',
            error:error
        })
    }
}

const getById = async(req,res)=>{
    try{
        const id = req.params.id
        const competencie = await competencieAthletesModel.getById(id)
        if(!competencie){
            return res.status(404).json({
                status:'Error',
                mensaje:'No existe este registro de competencia'
            })
        }
        return res.status(200).json({
            status:'Success',
            competencie
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener la informacion de la competencia',
            error:error
        })
    }
}



const getByUserId = async(req,res)=>{
    try{
        const user_id = req.params.id
        const competencies = await competencieAthletesModel.getByUserId(user_id)
        if(competencies.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'Este usuario no tiene competencias registradas'
            })
        }
        return res.status(200).json({
            status:'Success',
            competencies
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener la informacion de la competencia',
            error:error
        })
    }
}

const getByUserName = async(req,res)=>{
    try{
        const userName = req.params.userName
        if(!userName){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerido el nombre para realizar la consulta'
            })
        }

        const competencies = await competencieAthletesModel.getByUserName(userName)
        if(competencies.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'Este usuario no tiene competencias registradas'
            })
        }

        return res.status(200).json({
            status:'Success',
            competencies
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener las competencias'
        })
    }
}

const getByCompetencyName = async(req,res)=>{
    try{
        const competency_name = req.params.competency_name
        if(!competency_name){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerido el nombre de la competencia '
            })
        }

        const competencies = await competencieAthletesModel.getByCompetencyName(competency_name)
        if(competencies.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:`No existe competencias con el nombre ${competency_name}`
            })
        }

        return res.status(200).json({
            status:'Success',
            competencies
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener las competencias'
        })
    }
}

const getByCompetencyStatus = async(req,res)=>{
    try{
        const status = req.params.status
        if(!status){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerido el estado para hacer la consulta'
            })
        }
        
        const competencies = await competencieAthletesModel.getByCompetencyStatus(status)

        if(competencies.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:`No existen competencias con el estado ${status}`
            })
        }

        return res.status(200).json({
            status:'Success',
            competencies
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener las competencias'
        })
    }
}

const getByActiveUser = async(req,res)=>{
    try{
        const user_id = req.user.id
        const competencies = await competencieAthletesModel.getByUserId(user_id)
        if(competencies.length === 0){
            return res.status(404).json({
                status:'Error',
                mensaje:'Este usuario no tiene competencias registradas'
            })
        }
        return res.status(200).json({
            status:'Success',
            competencies
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo obtener la informacion de la competencia',
            error:error
        })
    }
}

const createActiveUser = async(req,res)=>{
    try{
        const user_id = req.user.id
        const {competency_id} = req.body
        const id = competency_id
        if(!competency_id){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerido el id de competencia'
            })
        }
        const existsCompetencie = await competenciesModel.getById(id)
        if(!existsCompetencie){
            return res.status(400).json({
                status:'Error',
                mensaje:'No existe esta competencia'
            })
        }
        const competencie = await competencieAthletesModel.create(competency_id,user_id)
        return res.status(200).json({
            status:'Success',
            competencie
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo crear la competencia'
        })
    }
}

const create = async(req,res)=>{
    try{
        const user_id = req.params.id
        const {competency_id} = req.body
        const id = competency_id
        if(!competency_id){
            return res.status(400).json({
                status:'Error',
                mensaje:'Es requerido el id de competencia'
            })
        }
        const existsCompetencie = await competenciesModel.getById(id)
        if(!existsCompetencie){
            return res.status(400).json({
                status:'Error',
                mensaje:'No existe esta competencia'
            })
        }
        const competencie = await competencieAthletesModel.create(competency_id,user_id)
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

const deleteUserOfCompetency = async(req,res)=>{
    try{
        const id = req.params.id
        const competencie = await competencieAthletesModel.deleteUserOfCompetency(id)
        if(!competencie){
            return res.status(400).json({
                status:'Error',
                mensaje:'Usuario no registrado en esta competencia'
            })
        }
        return res.status(200).json({
            status:'Success',
            competencie
        })
    }catch(error){
        return res.status(500).json({
            status:'Error',
            mensaje:'No se pudo eliminar este usuario de esta competencia'
        })
    }
}

module.exports = {
    getAll,
    getById,
    getByUserId,
    getByUserName,
    getByCompetencyName,
    getByCompetencyStatus,
    getByActiveUser,
    createActiveUser,
    create,
    deleteUserOfCompetency
}