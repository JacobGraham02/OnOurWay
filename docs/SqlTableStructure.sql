-- CREATE DATABASE IF NOT EXISTS OnOurWay; 

-- DROP DATABASE onourway;
-- CREATE DATABASE onourway;
USE OnOurWay;
SELECT * FROM Customer;
-- DROP TABLE IF EXISTS customer, passenger, vehicle, carpool_passenger, driver, driver_car, carpool, ticket;
-- DROP TABLE IF EXISTS carpool, carpool_passenger;
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
SELECT Carpool.id, Carpool.starting_address, Carpool.ending_address, Carpool.maximum_passengers, Carpool_Passenger.id, Carpool_passenger.carpool_id 
FROM Carpool INNER JOIN Carpool_Passenger ON Carpool.id = Carpool_Passenger.carpool_id AND Carpool_Passenger.id = 10;
-- UPDATE CUSTOMER SET username="TestUsername", first_name="Jacob", last_name="Graham", phone_number="(888) 888-8888", email="test@gmail.com", credit_card_number="255", credit_card_cvc="255", 
-- credit_card_effective_date="2022-11-14", credit_card_expiry_date="2022-11-14" WHERE email = 'test@gmail.com';

INSERT INTO Carpool (starting_address, ending_address, maximum_passengers, start_time, end_time) VALUES ("Test starting address 1", "Test ending address 1", 9, "12:00", "17:00"); 
DELETE FROM Customer WHERE id < 1000;
DELETE FROM Carpool_Passenger WHERE id < 1000;
DELETE FROM Carpool WHERE id < 1000;
SELECT * FROM Carpool;
SET foreign_key_checks = 0;
SET foreign_key_checks = 1;
-- DELETE FROM Carpool WHERE id < 1000;


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
    maximum_passengers int NOT NULL CONSTRAINT max_passengers_nine CHECK (maximum_passengers <= 9),
    start_time varchar(50) NOT NULL,
    end_time varchar(50) NOT NULL
);

DROP TABLE Carpool;

CREATE TABLE Vehicle (
	id int NOT NULL PRIMARY KEY UNIQUE,
	colour varchar(100) NOT NULL,
    make varchar(100) NOT NULL,
    model varchar(100) NOT NULL,
    year_made int NOT NULL CONSTRAINT year_between_dates CHECK (year_made >= 1920 AND year_made <= 2024),
    license_plate varchar(100) NOT NULL UNIQUE
);

CREATE TABLE Carpool_Passenger (
	id int NOT NULL,
    carpool_id int NOT NULL,
    FOREIGN KEY (id) REFERENCES Customer (id),
    FOREIGN KEY (carpool_id) REFERENCES Carpool (id)
);
SELECT Carpool.id, Carpool.starting_address, Carpool.ending_address, Carpool.maximum_passengers, Carpool_Passenger.id, Carpool_passenger.carpool_id 
    FROM Carpool INNER JOIN Carpool_Passenger ON Carpool.id = Carpool_Passenger.carpool_id AND Carpool_Passenger.id = 29;

SELECT * FROM Carpool_Passenger;

DROP TABLE IF EXISTS Carpool_Passenger;

ALTER TABLE Carpool_Passenger MODIFY COLUMN id INT auto_increment;

CREATE TABLE Driver_car (
	id int NOT NULL PRIMARY KEY,
    vehicle_id int NOT NULL,
    FOREIGN KEY (id) REFERENCES Driver (id),
    FOREIGN KEY (vehicle_id) REFERENCES Vehicle (id)
);

INSERT INTO Carpool_Passenger (id, carpool_id) VALUES ('10', '5')

