/**
 * The utils function for managing the authentication process
 * @module utils/auth
 */
'use strict'

const jwt = require('jsonwebtoken')

/**
 * Manage the utils function for the auth
 **/
module.exports = {
  /**
   * Return the secret key to be use with JWT
   * @return {string} The secret key
   **/
  get_secret: () => {
    return Buffer.from(process.env.SECRET_JWT, 'base64')
  },
  /**
   * Return the token from the bearer token
   * @param {string} bearer_token The bearer token
   * @return {string} The token
   **/
  get_token_from_bearer: (bearer_token) => {
    return bearer_token !== null && bearer_token.split(' ')[0] === 'Bearer' ? bearer_token.split(' ')[1] : null
  },
  /**
   * Create the informations to put inside the token
   * @param {Object} user The user you want to take the informations from
   * @return {Object} The payload
   **/
  create_payload: (user) => {
    return {
      date_given: Date.now(),
      id: user._id,
      name: user.name
    }
  },
  /**
   * Create a token for an user
   * @param {Object} user The user you want to create the token for
   * @return {string} The token for the OAUTH
   **/
  create_token: (user) => {
    const payload = module.exports.create_payload(user)
    const token = jwt.sign(payload, module.exports.get_secret(), { expiresIn: process.env.TOKEN_EXPIRE_TIME })
    return token
  },
  /**
   * Decode a token using the secret key
   * @return {Object} The object who was encoded in the token
   **/
  decode_token: (token) => {
    return jwt.decode(token, module.exports.get_secret())
  },
  /**
   * Read the token and check is validity and if it expires
   * @param {Object} context The context of the call
   * @return {Object} The decoded information from the token
   **/
  read_token_from_context: (context) => {
    const token = module.exports.get_token_from_bearer(context.auth)
    if (!token) {
      throw new Error('Not Authorized.')
    }

    const payload = module.exports.decode_token(token)
    if (Date.now() > payload.exp * 1000) {
      throw new Error('The token expired.')
    }

    return payload
  },
  /**
   * Verify Token
   * @param {String} token - Containing the bearer token
   * @return {Boolean} Return if token is true or not
   */
  verify_token_from_header: async (headers) => {
    if (!headers.authorization) {
      throw new Error('No token is provided')
    }
    const token = module.exports.get_token_from_bearer(headers.authorization)
    if (!token) {
      throw new Error('Invalid token')
    }
    const payload = module.exports.decode_token(token)
    if (Date.now() > payload.exp * 1000) {
      throw new Error('The token is expired')
    }
    return payload
  }
}
