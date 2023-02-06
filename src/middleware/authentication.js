/**
 * @module middleware/authorization This module will handle the middleware for express
 */
const path = require('path')
const filename = path.basename(__filename, '.js')
const utils_auth = require('@src/services/utils/' + filename)
const utils_user = require('@src/services/utils/user')
const utils_user_type = require('@src/services/utils/user_type')
const response = require('@src/libs/response')

module.exports = {
  /**
   * Check that the user has a valid token for accessing the call
   **/
  isLoggedIn: async (req, res, next) => {
    const verify_token = await utils_auth.verify_token_from_header(req.headers)
    if (verify_token.error) {
      return response.error(res, 401, verify_token.error)
    }
    return next()
  },
  /**
   * Check that the user has valid permission level
   */
  isAdmin: async (req, res, next) => {
    const verify_token = await utils_auth.verify_token_from_header(req.headers)
    if (verify_token.error) {
      response.error(res, 401, verify_token.error)
    }
    // Get the user
    const user = await utils_user.get_user_by_id(verify_token.id)
    if (user.error) {
      return response.error(res, 401, user.error)
    }
    // Get the user type
    const user_type = await utils_user_type.get_user_type_by_id(user.user_type)
    if (user_type.permission_level < 99) {
      return response.error(res, 401, 'You do not have enough permission for this request.')
    }
    return next()
  }
}
