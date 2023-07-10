var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port : 3306,
  user     : 'root',
  password : 'Bharath@2002',
  database : 'yaswanth',
  multipleStatements: true
});

module.exports = connection;