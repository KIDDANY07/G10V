const pool = require('../config/db')

const getAll = async () => {
    const result = await pool.query(`
        SELECT
            cu.id,
            cu.user_id, -- agregado el id del usuario
            u.names AS user_name,
            c.name AS competency_name,
            c.category AS competency_category,
            c.status AS competency_status,
            c.description AS competency_description
        FROM competency_users cu
        JOIN users u ON cu.user_id = u.id
        JOIN competencies c ON cu.competency_id = c.id
    `)
    return result.rows
}


const getById = async (id) => {
    const result = await pool.query(`
        SELECT 
            cu.id AS competency_user_id,
            u.id AS user_id,
            u.names AS user_name,
            c.id AS competency_id,
            c.name AS competency_name,
            c.category AS competency_category,
            c.status AS competency_status,
            c.description AS competency_description
        FROM
            competency_users cu
        JOIN
            users u ON cu.user_id = u.id
        JOIN
            competencies c ON cu.competency_id = c.id
        WHERE
            cu.id = $1;
    `, [id])

    return result.rows[0]
}

const getByUserId = async (user_id) => {
    const result = await pool.query(`
        SELECT 
            cu.id AS competency_user_id,
            u.id AS user_id,
            u.names AS user_name,
            c.id AS competency_id,
            c.name AS competency_name,
            c.category AS competency_category,
            c.status AS competency_status,
            c.description AS competency_description
        FROM
            competency_users cu
        JOIN
            users u ON cu.user_id = u.id
        JOIN
            competencies c ON cu.competency_id = c.id
        WHERE
            u.id = $1
        ORDER BY
            c.name;
    `, [user_id])

    return result.rows
}

const getByUserName = async (userName) => {
    const result = await pool.query(`
        SELECT 
            cu.id AS competency_user_id,
            u.id AS user_id,
            u.names AS user_name,
            c.id AS competency_id,
            c.name AS competency_name,
            c.category AS competency_category,
            c.status AS competency_status,
            c.description AS competency_description
        FROM
            competency_users cu
        JOIN
            users u ON cu.user_id = u.id
        JOIN
            competencies c ON cu.competency_id = c.id
        WHERE
            u.names ILIKE $1
        ORDER BY
            c.name;
    `, [userName])

    return result.rows
}

const getByCompetencyName = async (competency_name) => {
    const result = await pool.query(`
        SELECT 
            cu.id AS competency_user_id,
            u.id AS user_id,
            u.names AS user_name,
            c.id AS competency_id,
            c.name AS competency_name,
            c.category AS competency_category,
            c.status AS competency_status,
            c.description AS competency_description
        FROM
            competency_users cu
        JOIN
            users u ON cu.user_id = u.id
        JOIN
            competencies c ON cu.competency_id = c.id
        WHERE
            c.name ILIKE $1
        ORDER BY
            u.names;
    `, [competency_name])

    return result.rows
}

const getByCompetencyStatus = async (status) => {
    const result = await pool.query(`
      SELECT 
        cu.id AS competency_user_id,
        u.id AS user_id,
        u.names AS user_name,
        c.id AS competency_id,
        c.name AS competency_name,
        c.category AS competency_category,
        c.status AS competency_status,
        c.description AS competency_description
      FROM
        competency_users cu
      JOIN
        users u ON cu.user_id = u.id
      JOIN
        competencies c ON cu.competency_id = c.id
      WHERE
        c.status ILIKE $1
      ORDER BY
        u.names, c.name;
    `, [status])

    return result.rows
}

const create = async(competency_id,user_id)=>{
    const result = await pool.query('INSERT INTO "competency_users"("competency_id","user_id") VALUES ($1,$2) RETURNING *',[competency_id,user_id])
    return result.rows[0]
}

const deleteUserOfCompetency = async(id)=>{
    const result = await pool.query('DELETE FROM "competency_users" WHERE id = $1 RETURNING *',[id])
    return result.rows[0]
}

module.exports = {
    getAll,
    getById,
    getByUserId,
    getByUserName,
    getByCompetencyName,
    getByCompetencyStatus,
    create,
    deleteUserOfCompetency
}
