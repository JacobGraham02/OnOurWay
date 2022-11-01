var mysql = require('mysql2');
require('dotenv').config({path:'../.env'});

const database_connection_limit = 10;
const database_host = process.env.database_host;
const database_user = process.env.database_user;
const database_password = process.env.database_password;
const database_name = process.env.database_name;
const database_port = process.env.database_port;

const initialize_database_connection_pool = mysql.createPool({
  connectionLimit: database_connection_limit,
  host: database_host,
  port: database_port,
  user: database_user,
  password: database_password,
  database: database_name
});

exports.initialize_database_connection_pool = initialize_database_connection_pool;