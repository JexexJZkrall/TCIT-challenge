import pool from '../db/database.js';

export const getAllPosts = async () => {
    const result = await pool.query(
        'SELECT id, name, description FROM posts ORDER BY id DESC'
    );
    return result.rows;
};

export const createPost = async (name, description) => {
    const result = await pool.query(
        `INSERT INTO posts (name, description)
        VALUES ($1, $2)
        RETURNING id, name, description`,
        [name, description]
    );
    return result.rows[0];
};

export const deletePost = async (id) => {
    const result = await pool.query(
        `DELETE FROM posts
        WHERE id = $1
        RETURNING id, name, description`,
        [id]
    );
    return result.rows[0];
};
