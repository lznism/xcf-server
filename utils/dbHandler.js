const mysql = require('mysql');
const CONFIG = require('../config/db');

function dbHandler(sql) {
    const pool = mysql.createPool(CONFIG);
    return new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                reject({code: -1, message: err});
            } else {
                conn.query(sql, (err, results) => {
                    conn.release();
                    if (err) {
                        reject({code: -1, message: err});
                    } else {
                        resolve({code: 0, message: results[0]});
                    }
                });
            }
        });
    });
}

module.exports = dbHandler;