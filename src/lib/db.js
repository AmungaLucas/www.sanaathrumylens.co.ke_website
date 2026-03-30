// src/lib/db.js
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

export async function query(sql, params = []) {
    // Filter out undefined values and convert to null
    const cleanParams = params.map(param => param === undefined ? null : param);

    try {
        const [rows] = await pool.execute(sql, cleanParams);
        return rows;
    } catch (error) {
        console.error('Database query error:', error);
        console.error('SQL:', sql);
        console.error('Params:', cleanParams);
        throw error;
    }
}

export async function transaction(callback) {
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
        const result = await callback(connection);
        await connection.commit();
        return result;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

export default pool;