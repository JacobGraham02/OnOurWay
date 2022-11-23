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
    let query_string = `INSERT INTO Carpool (starting_address, ending_address, maximum_passengers, start_time, end_time) VALUES (?, ?, ?, ?, ?)`;
    return new Promise(function(resolve, reject) {
        database_manager.initialize_database_connection_pool().getConnection(function(error, connection) {
            connection.query(query_string, [carpool.start_address, carpool.end_address, carpool.max_passengers, carpool.start_time, carpool.end_time], function(error, results) {
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

const getSpecificCarpoolPassenger = function(where) {
    const where_clause = concatenateSqlQueryStringForWhereClause(where);
    let query_string = `SELECT * FROM Carpool_Passenger WHERE ${where_clause}`;
    return new Promise(function(resolve, reject) {
        database_manager.initialize_database_connection_pool().getConnection(function(error, connection) {
            connection.query(query_string, function(error, results) {
                if (error) {
                    reject(error)
                }
                resolve(results);
                connection.release();
            });
        });
    });
}

const addCarpoolPassenger = function(user_id, carpool_id) {
    let query_string = `INSERT INTO Carpool_Passenger (id, carpool_id) VALUES (?, ?)`;
    return new Promise(function(resolve, reject) {
        database_manager.initialize_database_connection_pool().getConnection(function(error, connection) {
            connection.query(query_string, [user_id, carpool_id], function(error, results) {
                if (error) {
                    reject(error)
                }
                resolve(results);
                connection.release();
            });
        });
    });
};

const deleteCarpoolPassenger = function(carpool_id) {
    let query_string = `DELETE FROM Carpool_Passenger WHERE id = ?`;
    return new Promise(function(resolve, reject) {
        database_manager.initialize_database_connection_pool().getConnection(function(error, connection) {
            connection.query(query_string, [carpool_id], function(error, results) {
                if (error) {
                    reject(error);
                } 
                resolve(results);
                connection.release();
            });
        });
    });
}

const getCustomerCarpoolWithJoin = function(user_id, carpool_id) {
    let query_string = `SELECT Carpool.id, Carpool.starting_address, Carpool.ending_address, Carpool.maximum_passengers, Carpool_Passenger.id, Carpool_passenger.carpool_id 
    FROM Carpool INNER JOIN Carpool_Passenger ON Carpool.id = Carpool_Passenger.carpool_id AND Carpool_Passenger.id = ${user_id}`;
    console.log(query_string);
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
}

const getCustomerCarpools = function(user_id) {
    let query_string = `SELECT Carpool.id, Carpool.starting_address, Carpool.ending_address, Carpool.maximum_passengers, Carpool_Passenger.id, Carpool_passenger.carpool_id 
    FROM Carpool INNER JOIN Carpool_Passenger ON Carpool.id = Carpool_Passenger.carpool_id AND Carpool_Passenger.id = ${user_id}`;
    console.log(query_string);
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
}

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

// Select from both the Customer and Carpool table
const addCustomerToCarpoolJunctionTable = function(user_id, carpool_id) {
    const where_clause_string = concatenateSqlQueryStringForWhereClause(where);
    let query_string = `INSERT INTO CarpoolPassenger (id, carpool_id) VALUES ()`

    /*
    insert into  trips_places_asc ( trip_id, place_id )
    values (  (select trip_id from trips where trip_name = 'MyTrip'),
              (select place_id from places where place_name = 'XYZ') );
    CREATE TABLE Carpool_Passenger (
	    id int NOT NULL PRIMARY KEY,
        carpool_id int NOT NULL,
        FOREIGN KEY (id) REFERENCES Passenger (id),
        FOREIGN KEY (carpool_id) REFERENCES Carpool (id)
    );
    */
}

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
exports.addCarpoolPassenger = addCarpoolPassenger;
exports.getCustomerCarpoolWithJoin = getCustomerCarpoolWithJoin;
exports.getSpecificCarpoolPassenger = getSpecificCarpoolPassenger;
exports.getCustomerCarpools = getCustomerCarpools;
exports.deleteCarpoolPassenger = deleteCarpoolPassenger;