/**
 * The module for managing everything relative to the server
 * @module server
 */
'use strict'

require('module-alias/register')
const express = require('express')
const logger = require('./libs/logger')
const fs = require('fs')
const cors = require('cors')
const util_treasure = require('@src/services/utils/treasure')
module.exports = {
  /**
   * Create the restify server
   * @return {Express} A server restify without any routes
   **/
  create_server: () => {
    return express()
  },
  /**
   * Allow us to use the middleware helmet for hidding some headers
   * @param {Express} server The server allowed to use helmet
   **/
  register_helmet: (server) => {
    server.use(require('helmet')())
  },
  /**
   * Allow us to use the middleware cors
   * @param {Express} server The server allowed to use cors
   **/
  register_cors: (server) => {
    server.use(cors())
  },
  /**
   * Allow us to use the middleware of body-parser
   * @param {Express} server The server allowed to use body-parser
   */
  register_body_parser: (server) => {
    const bodyParser = require('body-parser')
    server.use(bodyParser({ extended: true }))
    server.use(bodyParser.urlencoded({ extended: true }))
    server.use(bodyParser.json())
  },
  /**
   * Get all the routes
   * @param {Express} server - The express server
   * @return {all_routes} Return all the routes
   */
  routes: async (server) => {
    const paths = fs.readdirSync('./src/routes')
    for (const path of paths) {
      const route = path.replace(/.js/g, '')
      server.use('/app/', require('./routes/' + route))
    }
  },
  /**
   * Start the server using the parameter
   * @param {string} name The name of the server
   * @param {string} host The host of the server
   * @param {string} port The port of the server
   * @return {Promise<boolean>} True if the server start or else an error
   **/
  start: async (name, host, port) => {
    const server = module.exports.create_server()

    module.exports.register_cors(server)
    module.exports.register_body_parser(server)
    module.exports.register_helmet(server)
    module.exports.routes(server)
    await util_treasure.insert_2dsphere()
    return new Promise((resolve, reject) => {
      server.listen({ port, host }, (error) => module.exports.callback(error, resolve, reject))
    })
  },
  /**
   * Handle the callback of the server listening
   * @param {Error} error The object error returned by the listen function
   **/
  callback: (error, resolve, reject) => {
    if (error) {
      logger.info('Server fail to start !')
      logger.log('Server fail to start !')
      reject(new Error('Server fail to start !'))
    }
    logger.info('Server Started at Port: ' + process.env.PORT)
    logger.log('Logger Activated')
    resolve(true)
  }
}
