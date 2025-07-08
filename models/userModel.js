const pool = require('../config/db')


const getAll = async()=>{
    const result = await pool.query('SELECT * FROM users')
    return result.rows
}

const getById = async(id)=>{
    const result = await pool.query('SELECT * FROM users WHERE id = $1',[id])
    return result.rows[0]
}

const getByEmail = async(email)=>{
    const result = await pool.query('SELECT * FROM users WHERE email = $1',[email])
    return result.rows[0]
}

const create = async(names,email,hashedPassword,document,type_document,rol)=>{
    const result = await pool.query('INSERT INTO users (names,email,password,document,type_document,rol) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',[names,email,hashedPassword,document,type_document,rol])
    return result.rows[0]
}

const update = async(age,date_birth,stature,weight,position,id)=>{
    const result = await pool.query('UPDATE users SET age = $1, date_birth = $2, stature = $3, weight = $4, position = $5 WHERE id = $6 RETURNING *',[age,date_birth,stature,weight,position,id])
    return result.rows[0]
}

const deleteUser = async(id)=>{
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *',[id])
    return result.rows[0]
}


module.exports = {
    getAll,
    getById,
    getByEmail,
    create,
    update,
    deleteUser
}