const pool = require('../config/db')

const getAll = async()=>{
    const result = await pool.query('SELECT * FROM documents ORDER BY id DESC')
    return result.rows
}

const getById = async(id)=>{
    const result = await pool.query('SELECT * FROM documents WHERE id = $1',[id])
    return result.rows[0]
}

const getByUserName = async(name_user)=>{
    const result = await pool.query('SELECT * FROM documents WHERE "name_user" = $1',[name_user])
    return result.rows[0]
}

const getByUserId = async(user_id)=>{
    const result = await pool.query('SELECT * FROM documents WHERE "user_id" = $1',[user_id])
    return result.rows[0]
}

const create = async(user_id,document_file,civil_registry,lfb_file,name_user)=>{
    const result = await pool.query('INSERT INTO documents ("user_id","document_file","civil_registry","lfb_file","name_user") VALUES ($1,$2,$3,$4,$5) RETURNING *',[user_id,document_file,civil_registry,lfb_file,name_user])
    return result.rows[0]
}

const update = async(document_file,civil_registry,lfb_file,user_id)=>{
    const result = await pool.query('UPDATE documents SET "document_file" = $1,"civil_registry" = $2,"lfb_file" = $3 WHERE "user_id" = $4 RETURNING *',[document_file,civil_registry,lfb_file,user_id])
    return result.rows[0]
}

const deleteDocuments = async(user_id)=>{
    const result = await pool.query('DELETE FROM documents WHERE "user_id" = $1 RETURNING *',[user_id])
    return result.rows[0]
}

module.exports = {
    getAll,
    getById,
    getByUserName,
    getByUserId,
    create,
    update,
    deleteDocuments
}