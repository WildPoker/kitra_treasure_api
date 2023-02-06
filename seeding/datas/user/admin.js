'use strict'

const mongoose = require('mongoose')

module.exports = [
  {
    _id: mongoose.Types.ObjectId('5fd5b58efbc2f7a33c2ab000'),
    name: 'ADMIN',
    username: 'admin',
    email: 'admin@admin.com',
    password: '$2a$12$NpoK35hVacoFBC2r7fwt4OoYZW0uxMuFt3aali3urNV9lc8o1zbHa', // Admin123321
    user_type: mongoose.Types.ObjectId('5fd5b58efbc2f7a33c2aa001')
  }
]
