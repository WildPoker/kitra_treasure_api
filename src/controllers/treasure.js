/**
 * @module Treasure This module will handle regarding treasure route
 */

'use strict'

const logger = require('@src/libs/logger')
const util_treasure = require('@src/services/utils/treasure')

module.exports = {
  /**
   * @Route This route will handle the treasure find
   */
  find: async (req, res) => {
    logger.log('Finding treasure in to the app')

    try {
      const longitude = Number(req.query.longitude)
      const latitude = Number(req.query.latitude)
      const distance = req.query.distance
      const amount = req.query?.prize_value

      if (!longitude | !latitude | !distance) throw new Error('Please provide a params of longitude, latitude, and a distance')
      const treasures = await util_treasure.find_treasure({ longitude, latitude, distance, amount })
      if (!treasures.length) throw new Error('No treasure has been found')
      return res.status(200).json({ message: 'Successfully found a treasue', treasures })
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
