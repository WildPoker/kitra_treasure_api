/**
 * The endpoint of the express app
 * @module routes/treasure
 */
'use strict'

const express = require('express')
const router = express.Router()
const ctrl_treasure = require('@src/controllers/treasure')
const { isLoggedIn } = require('@src/middleware/authentication')
/**
 * Route for login treasure
 */
router.get('/treasure/find', isLoggedIn, ctrl_treasure.find)

module.exports = router
