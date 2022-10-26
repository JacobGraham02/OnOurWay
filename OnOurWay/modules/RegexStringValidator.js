const email_regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const first_name_regex = new RegExp(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/)
const last_name_regex = new RegExp(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/)

/**
 * /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
 * Uses the official email regex at emailregex.com to validate a supplied email address
 * @param {string} email_address 
 * @returns true or false depending on if the value for email_address matches the email regex
 */
function validateEmail(email_address) {
    return email_regex.test(email_address);
}

/**
 * /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
 * Uses a first name regex string to validate a supplied first name
 * @param {string} first_name 
 * @returns true or false depending on if the value for first_name matches the first name regex
 */
function validateFirstName(first_name) {
    return first_name_regex.test(first_name)
}

/**
 * /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/
 * Uses a last name regex string to validate a supplied last name
 * @param {string} last_name 
 * @returns true or false depending on if the value for last_name matches the last name regexs
 */
function validateLastName(last_name) {
    return last_name_regex.test(last_name);
}

export {validateEmail, validateFirstName, validateLastName};