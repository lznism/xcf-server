const md5 = require('md5');
const dbHandler = require('../utils/dbHandler');

async function register(username, password) {
    const sqlQuery = `SELECT count(*) AS count FROM xcf_password WHERE username = '${username}' AND password = '${password}'`;
    const sqlInsert = `INSERT INTO xcf_password (username, password) VALUES ('${username}', '${password}')`;

    let queryResult = await dbHandler(sqlQuery)
        .then(res => res)
        .catch(err => err);
    
    if (queryResult.code === 0 && queryResult.data.count === 0) {
        let insertResult = await dbHandler(sqlInsert)
            .then(res => res).catch(err => err);
        return insertResult;        
    } else {
        return queryResult;
    }

}

module.exports = register;