-- CREATE DATABASE IF NOT EXISTS OnOurWay; 

-- DROP DATABASE onourway;
-- CREATE DATABASE onourway;
USE OnOurWay;
SELECT * FROM Customer;
-- DROP TABLE IF EXISTS customer, passenger, vehicle, carpool_passenger, driver, driver_car, carpool, ticket;
DROP TABLE IF EXISTS carpool, carpool_passenger;
CREATE TABLE Customer (
    id int NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
    username varchar(25) NOT NULL UNIQUE,
    password varchar(255) NOT NULL UNIQUE,
    salt varchar(255) NOT NULL UNIQUE,
    first_name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    credit_card_number varchar(20) NOT NULL UNIQUE,
    credit_card_cvc char(3) NOT NULL,
    credit_card_effective_date DATE NOT NULL,
    credit_card_expiry_date DATE NOT NULL,
    phone_number varchar(100) NOT NULL UNIQUE,
    email varchar(100) NOT NULL UNIQUE
);

INSERT INTO Carpool (starting_address, ending_address, maximum_passengers) VALUES ("Test starting address 1", "Test ending address 1", 9);

SELECT * FROM Carpool;

DELETE FROM Carpool WHERE id < 1000;

ALTER TABLE Customer ADD path_to_image varchar(255);

CREATE TABLE Passenger (
	id int NOT NULL PRIMARY KEY,
    FOREIGN KEY (id) REFERENCES Customer (id)
);

CREATE TABLE Driver (
	id int NOT NULL PRIMARY KEY,
    drivers_license_number varchar(100) NOT NULL UNIQUE,
    drivers_license_effective_date DATE NOT NULL,
    drivers_license_expiry_date DATE NOT NULL,
    insurance_policy_number varchar(100) NOT NULL UNIQUE,
    insurance_effective_date DATE NOT NULL,
    insurance_expiry_date DATE NOT NULL,
    join_date DATE DEFAULT NULL,
    total_drives int DEFAULT 0,
    total_distance_driven_km DECIMAL(9,1), # 8 digits to the left of decimal place, 1 to the right. ########.#
    FOREIGN KEY (id) REFERENCES Customer (id)
);

CREATE TABLE Ticket (
	id int NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
    effective_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    FOREIGN KEY (id) REFERENCES Passenger (id)
);

CREATE TABLE Carpool (
	id int NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
    starting_address varchar(100),
    ending_address varchar(100),
    maximum_passengers int NOT NULL CONSTRAINT max_passengers_nine CHECK (maximum_passengers <= 9)
);

CREATE TABLE Vehicle (
	id int NOT NULL PRIMARY KEY UNIQUE,
	colour varchar(100) NOT NULL,
    make varchar(100) NOT NULL,
    model varchar(100) NOT NULL,
    year_made int NOT NULL CONSTRAINT year_between_dates CHECK (year_made >= 1920 AND year_made <= 2024),
    license_plate varchar(100) NOT NULL UNIQUE
);

CREATE TABLE Carpool_Passenger (
	id int NOT NULL PRIMARY KEY,
    carpool_id int NOT NULL,
    FOREIGN KEY (id) REFERENCES Passenger (id),
    FOREIGN KEY (carpool_id) REFERENCES Carpool (id)
);

CREATE TABLE Driver_car (
	id int NOT NULL PRIMARY KEY,
    vehicle_id int NOT NULL,
    FOREIGN KEY (id) REFERENCES Driver (id),
    FOREIGN KEY (vehicle_id) REFERENCES Vehicle (id)
);
