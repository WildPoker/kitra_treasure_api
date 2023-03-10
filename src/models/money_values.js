/**
 * The models of the money value
 * @module models/money_value
 */
'use strict'

const mongoose = require('mongoose')
const path = require('path')
const filename = path.basename(__filename, '.js')

const schema = new mongoose.Schema(
  {
    treasure: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'treasure',
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    collection: filename,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

module.exports = mongoose.model(filename, schema)
