'use strict'

const mongoose = require('mongoose')

module.exports = [
  {
    _id: mongoose.Types.ObjectId('5fd5b58efbc2f7a33c2aa002'),
    name: 'USER',
    permission_level: 0
  },
  {
    _id: mongoose.Types.ObjectId('5fd5b58efbc2f7a33c2aa003'),
    name: 'MANAGER',
    permission_level: 51
  },
  {
    _id: mongoose.Types.ObjectId('5fd5b58efbc2f7a33c2aa001'),
    name: 'ADMIN',
    permission_level: 99
  },
  {
    _id: mongoose.Types.ObjectId('5fd5b58efbc2f7a33c2aa000'),
    name: 'SUPER_ADMIN',
    permission_level: 100
  }
]
