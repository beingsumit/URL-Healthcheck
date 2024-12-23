import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

// pool is a connection of DB
const pool = mysql.createPool({
    host: process.env.hostn,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database

}).promise()

// get all Data from DB
export async function getURL() {
    const result = await pool.query("select * from URLS")
    const rows = result[0]
    return rows
}
// get particular URL from DB
export async function getAppURL(ID) {
    const result = await pool.query(`select * from URLS where ID=? `, [ID])
    const rows = result[0]
    return rows[0]
}
// Create
export async function createURL(App, URL, Status, ID) {
    const result = await pool.query(`insert into URLS (Application, URL, Status, ID) values (?,?,?,?)`, [App, URL, Status, ID])
    const id= result.insertId
    return getAppURL(id) 
}

// update
export async function UpdateURL(App, URL, Status, ID) {
    const result = await pool.query(`update URLS set Application=?, URL=?, Status=?, ID=? where ID=?`, [App, URL, Status, ID])
    return result.affectedRows;
}

// deleting URL
export async function DeleteURL(ID) {
    const result = await pool.query(`delete from URLS where ID=?`, [ID])
    return result;
}



// const url = await UpdateURL("JIRA", "JIRA.COM", "Active", 2)
// console.log(url);

// const urls = await DeleteURL(4)
// console.log(urls);

