var mysql = require("mysql");

module.exports = async (params) =>
    new Promise((resolve, reject) => {
        var conn = mysql.createConnection({
            host: params.host,
            user: params.user,
            password: params.password,
            database: params.database,
        });

        conn.connect((error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(conn);
        });
    });
