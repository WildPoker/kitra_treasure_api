/**
 * Module for managing the dbs for treasure
 * @module dbs/treasure
 */
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const model = require('@src/models/' + filename)

module.exports = {
  /**
   * Call mongodb for getting an treasure
   * @return {Object[]} The treasure found or null
   **/
  find_treasure: ({ longitude, latitude, distance, min_amount, max_amount }) => {
    const aggregate = []

    aggregate.push(
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          distanceField: 'dist.calculated',
          maxDistance: distance,
          minDistance: 0,
          spherical: true
        }
      },
      {
        $lookup: {
          from: 'money_value',
          localField: '_id',
          foreignField: 'treasure',
          as: 'money_value'
        }
      },
      {
        $unwind: '$money_value'
      }
    )

    if (min_amount && max_amount) {
      aggregate.push({
        $match: {
          'money_value.amount': { $gte: min_amount, $lte: max_amount }
        }
      })
    }

    aggregate.push({
      $group: {
        _id: '$_id',
        latitude: { $first: '$latitude' },
        longitude: { $first: '$longitude' },
        name: { $first: '$name' },
        money_values: { $push: '$money_value' }
      }
    })

    return model.aggregate(aggregate)
  },
  /**
   * Call mongodb for getting an treasure
   * @return {Object[]} The user found or null
   **/
  update_seeded_data: () => {
    model.find({}, (error, docs) => {
      if (error) {
        console.error(error)
        return
      }

      docs.forEach((doc) => {
        doc.location = {
          type: 'Point',
          coordinates: [doc.longitude, doc.latitude]
        }

        doc.save((error) => {
          if (error) {
            console.error(error)
          }
        })
      })
    })
  }
}
