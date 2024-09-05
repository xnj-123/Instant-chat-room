var mysql = require('mysql')
var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'chatroom',
    charset  : 'utf8mb4' 
});

db.connect();

module.exports = db;