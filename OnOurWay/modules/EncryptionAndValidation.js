const crypto = require('crypto');
const customer_database_access = require('../persistence/CustomerDAO');
/**
 * 
 * @param {string} password 
 */
const encryptPassword = function(password) {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 60, 'sha512').toString('hex');
    password_data = {
        password: salt + hash,
        salt: salt,
    };
    return password_data;
};

/**
 * 
 * @param {object} password_data 
 */
const hashCustomerPassword = function(password_data) {
    customer_database_access.updateCustomer(password_data);
};

/**
 * 
 * @param {string} password 
 * @param {string} hash 
 * @param {string} salt 
 * @returns boolean 
 */
const validatePassword = function(password, hash, salt) {
    const compared_password = crypto.pbkdf2Sync(password, salt, 10000, 60, 'sha512').toString('hex');
    hash = hash.replace(salt, "");
    return hash === compared_password;
};
exports.encryptPassword = encryptPassword;
exports.validatePassword = validatePassword;