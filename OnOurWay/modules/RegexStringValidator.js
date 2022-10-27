const email_regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const first_name_regex = new RegExp(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/)
const last_name_regex = new RegExp(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/)
const phone_number_regex = new RegExp(/^[(]?[0-9]{3}[)]?[ ,-]?[0-9]{3}[ ,-]?[0-9]{4}$/);

/**
 * /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
 * Uses the official email regex at emailregex.com to validate a supplied email address
 * @param {string} email_address 
 * @returns true or false depending on if the value for email_address matches the email regex
 */
exports.validateEmail = function validateEmail(email_address) {
    return email_regex.test(email_address);
}

/**
 * /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
 * Uses a first name regex string to validate a supplied first name
 * @param {string} first_name 
 * @returns true or false depending on if the value for first_name matches the first name regex
 */
exports.validateFirstName = function validateFirstName(first_name) {
    return first_name_regex.test(first_name)
}

/**
 * /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
 * Uses a last name regex string to validate a supplied last name
 * @param {string} last_name 
 * @returns true or false depending on if the value for last_name matches the last name regex
 */
exports.validateLastName = function validateLastName(last_name) {
    return last_name_regex.test(last_name);
}

/**
 * /^[(]?[0-9]{3}[)]?[ ,-]?[0-9]{3}[ ,-]?[0-9]{4}$/
 * Uses a phone number regex string to validate a supplied phone number (North America format)
 * @param {string} phone 
 * @returns true or false depending on if the value for phone matches the phone number regex
 */
exports.validatePhoneNumber = function validatePhoneNumber(phone) {
    return phone_number_regex.test(phone);
}