let mysql = require('mysql');
let connection = mysql.createConnection(
    {
        host: 'furnitureservice.cp40yoio6zpn.ap-southeast-1.rds.amazonaws.com',
        port: '3306',
        user: 'admin',
        password: 'Password!234',
        database: 'Foundation',
        multipleStatements: true
    }
);

connection.connect(err => {
    if (err) throw err;
    console.log('Connected to DB');
});
module.exports = connection;