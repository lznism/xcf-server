const dbHandler = require('../utils/dbHandler');

async function login(username, password) {
    const sql = `SELECT password FROM xcf_password WHERE username = '${username}'`;
    let result = await dbHandler(sql);
    return result;
}

module.exports = login;