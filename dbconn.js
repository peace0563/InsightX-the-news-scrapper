const mysql = require('mysql');

function getConnection(){
    var con = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"password",
        database:"news_website"
    });
    return con;
}

module.exports.getConnection = getConnection