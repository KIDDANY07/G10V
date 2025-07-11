const pool = require('../config/db')

const getAll = async()=>{
    const result = await pool.query('SELECT * FROM competencies ORDER BY id DESC')
    return result.rows
}

const getById = async(id)=>{
    const result = await pool.query('SELECT * FROM competencies WHERE id =$1 ORDER BY id DESC',[id])
    return result.rows[0]
}

const getByName = async(name)=>{
    const result = await pool.query('SELECT * FROM competencies WHERE name = $1 ORDER BY id DESC',[name])
    return result.rows
}

const getByCategory = async(category)=>{
    const result = await pool.query('SELECT * FROM competencies WHERE category = $1 ORDER BY id DESC',[category])
    return result.rows
}

const getByStatus = async(status)=>{
    const result = await pool.query('SELECT * FROM competencies WHERE status = $1 ORDER BY id DESC',[status])
    return result.rows
}

const create = async(name,category,status,description)=>{
    const result = await pool.query('INSERT INTO competencies (name,category,status,description) VALUES ($1,$2,$3,$4) RETURNING *',[name,category,status,description])
    return result.rows[0]
}


const updateCompetencie = async(name,category,status,description,id)=>{
    const result = await pool.query('UPDATE competencies SET name = $1, category = $2, status = $3, description = $4 WHERE id = $5 RETURNING *',[name,category,status,description,id])
    return result.rows[0]
}

const deleteCompetencie = async(id)=>{
    const result = await pool.query('DELETE FROM competencies WHERE id = $1',[id])
    return result.rows[0]
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