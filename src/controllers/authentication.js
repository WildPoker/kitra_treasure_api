/**
 * @module Authentication This module will handle regarding user route
 */

'use strict'

const utils_user_type = require('@src/services/utils/user_type')
const utils_user = require('@src/services/utils/user')
const utils_authentication = require('@src/services/utils/authentication')
const utils_password = require('@src/services/utils/password')
const logger = require('@src/libs/logger')
const response = require('@src/libs/response')

module.exports = {
  /**
   * @Route This route will handle the login in of a user
   */
  login: async (req, res) => {
    logger.log('Logging in to the app')
    try {
      const args = req.body
      // Check if an account exist for the user
      const user = await utils_user.get_user_by_login(args.email)
      if (!user) {
        throw new Error('Email is invalid')
      }
      // Check if the password is the correct one
      const is_password_correct = await utils_password.compare_password_hash(args.password, user.password)
      if (!is_password_correct) {
        throw new Error('Incorrect Password')
      }
      // Create token
      const token = utils_authentication.create_token(user)
      return res.status(200).json({ message: 'Successfully logged in', token })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  },
  /**
   * This route will handle the registration of new user
   */
  register: async (req, res) => {
    logger.log('New signing to the app')
    try {
      const args = req.body
      // Get the deafault user type for the new user
      const default_user_type = await utils_user_type.get_default_user_type()
      args.user_type = default_user_type.id

      // Check if email is valid
      const user = await utils_user.add_user(args)

      // Create token
      const token = utils_authentication.create_token(user)
      return response.other(res, 201, { message: 'Successfully Created a new User', token })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
