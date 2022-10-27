var mysql = require('mysql');

const database_connection_limit = 10;
const database_host = process.env.localhost_database_host;
const database_password = process.env.localhost_database_password;
const database_name = process.env.localhost_database_name;

const initialize_database_connection_pool = mysql.createPool({
  connectionLimit: database_connection_limit,
  host: database_host,
  password: database_password,
  database: database_name
});


exports.getDatabaseConnection = function() {
  initialize_database_connection_pool.getConnection(function(error, connection) {
    
  });
}

exports.initialize_database_connection_pool = initialize_database_connection_pool;