var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port : 3306,
  user     : 'root',
  password : 'Eternal@12',
  database : 'deepstream_test2',
  multipleStatements: true
});

module.exports = connection;