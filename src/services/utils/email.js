/**
 * The utils function for managing the email process
 * @module utils/email
 */
'use strict'

const validator = require('email-validator')

/**
 * Manage the utils function for email
 **/
module.exports = {
  /**
   * Check if an email is valide meaning in the format xxx@xxx.xxx
   * @param {string} email The email you want to check
   * @return {Boolean} True if the email is valid or else False
   **/
  check_email: (email) => {
    return validator.validate(email)
  }
}
