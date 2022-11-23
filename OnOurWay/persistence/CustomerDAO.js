var database_manager = require('./DatabaseConnectionManager');

const getAllFromCustomer = function() {
    const query_string = `SELECT * FROM Customer LIMIT 1000`;
    return new Promise(function(resolve, reject) {
        database_manager.initialize_database_connection_pool().getConnection(function(error, connection) {
            if (error) {
                console.log(error);
            }
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

const getSpecificCustomer= function(where) {
    const where_clause = concatenateSqlQueryStringForWhereClause(where);
    let query_string = `SELECT * FROM CUSTOMER WHERE ${where_clause} LIMIT 1000`;
    return new Promise(function(resolve, reject) {
        database_manager.initialize_database_connection_pool().getConnection(function(error, connection) {
            if (error) {
                console.log(error);
            }
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

const addCustomer = function(customer) {
    let query_string = `INSERT INTO CUSTOMER (username, password, salt, first_name, last_name, credit_card_number, credit_card_cvc, credit_card_effective_date, credit_card_expiry_date, phone_number, email, path_to_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    return new Promise(function(resolve, reject) {
        database_manager.initialize_database_connection_pool().getConnection(function(error, connection) {
            connection.query(query_string, [customer.username, customer.password, customer.salt, customer.first_name, customer.last_name, customer.credit_card_number, 
                customer.credit_card_cvc, customer.credit_card_effective_date, customer.credit_card_expiry_date, customer.phone_number, customer.email, customer.image_path], 
                function(error, results) {
                if (error) {
                    reject(error);
                }
                resolve(results);
                connection.release();
            });
        });
    });
};

const updateCustomer = function(query_data) {
    const column_and_values_sql_string = concatenateSqlQueryStringForUpdate(query_data.column_names, query_data.column_values, query_data.total_columns);
    const where_clause_string = concatenateSqlQueryStringForWhereClause(query_data.where_clause);
    let query_string = `UPDATE CUSTOMER SET ${column_and_values_sql_string} WHERE ${where_clause_string}`;
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

const deleteCustomer = function(where) {
    const where_clause_string = concatenateSqlQueryStringForWhereClause(where);  
    let query_string = `DELETE FROM CUSTOMER WHERE ${where_clause_string}`;
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
    if (column_names.length <= 1) {
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
        if (i < total_columns - 1) {
            query_string += ', ';
        }
    }
    return query_string;
};

exports.getAllFromCustomer = getAllFromCustomer;
exports.getSpecificCustomer = getSpecificCustomer;
exports.addCustomer = addCustomer;
exports.updateCustomer = updateCustomer;
exports.deleteCustomer = deleteCustomer;
