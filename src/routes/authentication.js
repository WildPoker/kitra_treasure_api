/**
 * The endpoint of the express app
 * @module routes/authentication
 */
'use strict'

const express = require('express')
const router = express.Router()
const ctrl_authentication = require('@src/controllers/authentication')

/**
 * Route for login authentication
 */
router.post('/authentication/login', ctrl_authentication.login)

/**
 * Route for Register authentication
 */
router.post('/authentication/register', ctrl_authentication.register)

module.exports = router
