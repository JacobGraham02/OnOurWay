var database_manager = require('./DatabaseConnectionManager');
var mysql = require('mysql2');

const getAllFromCarpool = function() {
    const query_string = `SELECT * FROM Carpool`;
    return new Promise(function(resolve, reject) {
        database_manager.initialize_database_connection_pool().getConnection(function(error, connection) {
            connection.query(query_string, function(error, results) {
                if (error) {
                    reject(error);
                }
                resolve(results);
                connection.release();
            });
        });
    });
};

const getSpecificCarpool= function(where) {
    const where_clause = concatenateSqlQueryStringForWhereClause(where);
    let query_string = `SELECT * FROM Carpool WHERE ${where_clause} LIMIT 1000`;
    return new Promise(function(resolve, reject) {
        database_manager.initialize_database_connection_pool().getConnection(function(error, connection) {
            connection.query(query_string, function(error, results) {
                if (error) {
                    reject(error);
                }
                resolve(results);
                connection.release();
            });
        });
    });
};

const addCarpool = function(carpool) {
    console.log("add carpool is run");
    let query_string = `INSERT INTO Carpool (starting_address, ending_address, maximum_passengers) VALUES (?, ?, ?)`;
    return new Promise(function(resolve, reject) {
        database_manager.initialize_database_connection_pool().getConnection(function(error, connection) {
            connection.query(query_string, [carpool.start_address, carpool.end_address, carpool.max_passengers], function(error, results) {
                if (error) {
                    reject(error);
                }
                resolve(results);
                connection.release();
            });
        });
    });
};

const updateCarpool = function(query_data) {
    const column_and_values_sql_string = concatenateSqlQueryStringForUpdate(query_data.column_names, query_data.column_values, query_data.total_columns);
    const where_clause_string = concatenateSqlQueryStringForWhereClause(query_data.where_clause);
    let query_string = `UPDATE Carpool SET ${column_and_values_sql_string} WHERE ${where_clause_string}`;
    return new Promise(function(resolve, reject) {
        database_manager.initialize_database_connection_pool().getConnection(function(error, connection) {
            connection.query(query_string, function(error, results) {
                if (error) {
                    reject(error);
                }
                resolve(results);
                connection.release();
            });
        });
    });
};

const deleteCarpool = function(where) {
    const where_clause_string = concatenateSqlQueryStringForWhereClause(where);  
    let query_string = `DELETE FROM Carpool WHERE ${where_clause_string}`;
    return new Promise(function(resolve, reject) {
        database_manager.initialize_database_connection_pool().getConnection(function(error, connection) {
            connection.query(query_string, function(error, results) {
                if (error) {
                    reject(error);
                }
                resolve(results);
                connection.release();
            });
        });
    });
};

function concatenateSqlQueryStringForWhereClause(column_names) {
    let query_string = ``;
    if (column_names.length < 1) {
        return column_names[0];
    }
    for (let i = 0; i < column_names.length; i++) {
        query_string += column_names[i];
    }
    return query_string;
};

function concatenateSqlQueryStringForUpdate(column_names, column_values, total_columns) {
    let query_string = ``;
    for (let i = 0; i < total_columns; i++) {
        query_string += column_names[i] + '=' + '"' + column_values[i] + '"';
        console.log()
        if (i < total_columns - 1) {
            query_string += ', ';
        }
    }
    return query_string;
};

exports.getAllFromCarpool = getAllFromCarpool;
exports.getSpecificCarpool = getSpecificCarpool;
exports.addCarpool = addCarpool;
exports.updateCarpool = updateCarpool;
exports.deleteCarpool = deleteCarpool;