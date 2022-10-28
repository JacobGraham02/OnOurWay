var database_manager = require('./DatabaseConnectionManager');
var mysql = require('mysql2');

const database_connection = database_manager.getDatabaseConnection;


const getAllCustomers = function() {

}

const addCustomer = function() {

}

const updateCustomer = function() {

}

const deleteCustomer = function() {

}

exports.getAllCustomers = getAllCustomers();
exports.addCustomer = addCustomer();
exports.updateCustomer = updateCustomer();
exports.deleteCustomer = deleteCustomer();