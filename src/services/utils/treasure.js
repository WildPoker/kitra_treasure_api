/**
 * The utils function for managing the treasure
 * @module utils/treasure
 */
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const dbs = require('@src/dbs/' + filename)
const coords_validator = require('is-valid-coordinates')

/**
 * Manage the mutations for the question model
 **/
module.exports = {
  /**
   * @param {Object} args - Containing the info of the treasure to find
   */
  find_treasure: async ({ longitude, latitude, distance, amount }) => {
    const km_to_m_val = 1000
    let min_amount = 10
    let max_amount = 30

    if (!coords_validator(longitude, latitude)) {
      throw new Error('Longitude and Latitude provided is invalid')
    }

    if (!/^[1-9]km$|^10km$/.test(distance)) {
      throw new Error('The distance provided is invalid. Should only accept km and from 1km to 10km only')
    }

    if (amount) {
      // Split the string by " to "
      const parts = amount.split(' to ')

      if (parts.length !== 2) return false

      if (parts[0].charAt(0) !== '$' || parts[1].charAt(0) !== '$') throw new Error('The provided prize value need to start with "$". Example: $10 to $30')

      // Check if both parts can be parsed as numbers
      const min_mount = parseInt(parts[0].substr(1))
      const max_mount = parseInt(parts[1].substr(1))
      if (isNaN(min_mount) || isNaN(max_mount)) throw new Error('The provided prized value is incorrect. Please make sure to provide a number with a $ and a range. Sample: $10 to $30')

      if (min_mount < 10 || max_mount > 30) throw new Error('The provided minimum prize value and maximum prize value is invalid. The range is only $10 to $30')
      min_amount = min_mount
      max_amount = max_mount
    }
    distance = parseInt(distance.replace('km', '')) * km_to_m_val
    return dbs.find_treasure({ longitude, latitude, distance, min_amount, max_amount })
  },
  /**
   *
   */
  insert_2dsphere: async () => {
    try {
      await dbs.update_seeded_data()
    } catch (error) {
      console.log(error)
    }
    console.log('Successfuly inserted geolocation')
  }
}
