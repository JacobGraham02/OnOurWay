const crypto = require('crypto');
const customer_database_access = require('../persistence/CustomerDAO');
/**
 * 
 * @param {string} password 
 */
const encryptPassword = function(password) {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 60, 'sha512').toString('hex');
    const password_data = {
        column_names: [`password`],
        column_values: [hash + salt],
        total_columns: 1,
        where_clause: 'id <= 1000',
        hash: hash,
    }
    // const customer_for_database = {
    //     username: 'TestUsername',
    //     password: hash + salt,
    //     salt: salt,
    //     first_name: 'Jacob',
    //     last_name: 'Graham',
    //     credit_card_number: 255,
    //     credit_card_cvc: 255,
    //     credit_card_effective_date: '2022/11/14',
    //     credit_card_expiry_date: '2022/11/14',
    //     phone_number: '(888) 888-8888',
    //     email: 'test@gmail.com',
    // }
    // customer_database_access.addCustomer(customer_for_database);
}

/**
 * 
 * @param {object} password_data 
 */
const hashCustomerPassword = function(password_data) {
    customer_database_access.updateCustomer(password_data);
}

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
}

const query_where_clause = 'id <= 1000';
const customer = customer_database_access.getSpecificCustomer(query_where_clause);
customer.then((results) => {
    const user_password = "test1234"
    const hash = results[0].password;
    const salt = results[0].salt;
    validatePassword(user_password, hash, salt);
});
// encryptPassword("test1234");
exports.encryptPassword = encryptPassword;
exports.validatePassword = validatePassword;