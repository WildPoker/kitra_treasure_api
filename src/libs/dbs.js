/**
 * Set of global functions or constants about the dbs and mongoose
 * @module libs/dbs
 */
'use strict'

const constants = require('@src/libs/constants')
module.exports = {
  /**
   * Handle the Classic Filter
   **/
  handle_classic_filters: ({ matches, order, sort, limit, skip = 0, joint }) => {
    const aggregation = []

    if (matches.length === 1) {
      aggregation.push({ $match: matches[0] })
    } else if (matches.length > 1) {
      // Joint has been filtered in the filter util already
      aggregation.push({ $match: { ['$' + joint]: matches } })
    }

    // Sort the result
    order = order === constants.order_descending ? 1 : -1
    sort = sort !== null ? { [sort]: order } : { _id: order }
    aggregation.push({ $sort: sort })

    // Skip the result
    if (skip !== null) {
      aggregation.push({ $skip: skip })
    }
    // Limit the result
    if (limit !== null) {
      aggregation.push({ $limit: limit })
    }

    return aggregation
  },
  /**
   * Handle the Classic Filter version 2. adds defaults and record count.
   **/

  handle_classic_filters2: ({ matches, order, sort, limit, skip, joint, count }) => {
    matches = matches || []
    joint = joint || 'and'
    skip = skip || 0
    limit = limit || 10
    const aggregation = []
    order = order || 'desc'

    if (matches.length === 1) {
      aggregation.push({ $match: matches[0] })
    } else if (matches.length > 1) {
      // Joint has been filtered in the filter util already
      aggregation.push({ $match: { ['$' + joint]: matches } })
    }

    // Sort the result
    order = order === 'desc' ? -1 : 1
    sort = sort !== null ? { [sort]: order } : { _id: order }
    aggregation.push({ $sort: sort })

    const result = [
      {
        $match: {}
      }
    ]

    if (skip !== null) {
      result.push({ $skip: skip })
    }

    if (limit !== null) {
      result.push({ $limit: limit })
    }

    if (count !== null && count) {
      aggregation.push({
        $facet: {
          pageInfo: [
            {
              $count: 'totalRecords'
            }
          ],
          result
        }
      })
    }

    return aggregation
  },
  /**
   * Handle the Facet Filters
   **/
  handle_pagination_filters: ({ order, sort, limit, skip = 0, matches, joint }) => {
    const aggregation = []
    const data = []
    const total = []

    if (matches.length === 1) {
      data.push({ $match: matches[0] })
      total.push({ $match: matches[0] }, { $count: 'total' })
    } else if (matches.length > 1) {
      aggregation.push({ $match: { ['$' + joint]: matches } })
      // aggregation.push({ $match: { $or: matches } })
    }
    // Sort the result
    order = order === constants.order_descending ? 1 : -1
    sort = sort !== null ? { [sort]: order } : { _id: order }
    data.push({ $sort: sort })

    // Skip the result
    if (skip !== null) {
      data.push({ $skip: skip })
    }
    // Limit the result
    if (limit !== null) {
      data.push({ $limit: limit })
    }

    aggregation.push({
      $facet: { data: data, page_info: total }
    })

    return aggregation
  },
  /**
   * Handle the Facet Filters
   **/
  handle_facet_filters: ({ order, sort, limit, skip = 0, matches }) => {
    const aggregation = []
    const data = []
    const total = []

    if (matches) {
      data.push({ $match: matches })
      total.push({ $match: matches }, { $count: 'total' })
    }
    // Sort the result
    order = order === constants.order_descending ? 1 : -1
    sort = sort !== null ? { [sort]: order } : { _id: order }
    data.push({ $sort: sort })

    // Skip the result
    if (skip !== null) {
      data.push({ $skip: skip })
    }
    // Limit the result
    if (limit !== null) {
      data.push({ $limit: limit })
    }
    aggregation.push({
      $facet: { data: data, page_info: total }
    })
    return aggregation
  },
  /**
   * This function will handle relational query
   **/
  handle_relation_filter: ({ limit, skip, sort, order, join, lookup, pipeline, unwind, matches, count }) => {
    const aggregation = []

    // Setup lookup
    if (pipeline.length === 0) {
      aggregation.push({ $lookup: lookup })
    } else if (pipeline.length >= 1) {
      lookup.pipeline = pipeline
      aggregation.push({ $lookup: lookup })
    }

    // Unwind the replaced field
    if (unwind.length === 1) {
      aggregation.push(unwind[0])
    } else if (unwind.length > 1) {
      for (const obj of unwind) aggregation.push(obj)
    }

    // Handle the matches
    if (matches.length === 1) {
      aggregation.push({ $match: matches[0] })
    } else if (matches.length > 1) {
      aggregation.push({ $match: { ['$' + join]: matches } })
    }

    // Sort the result
    order = order === constants.order_descending ? 1 : -1
    sort = sort !== null ? { [sort]: order } : { _id: order }
    aggregation.push({ $sort: sort })

    const result = [
      {
        $match: {}
      }
    ]

    if (skip !== null) {
      result.push({ $skip: skip })
    }

    if (limit !== null) {
      result.push({ $limit: limit })
    }

    if (count !== null && count) {
      aggregation.push({
        $facet: {
          pageInfo: [
            {
              $count: 'totalRecords'
            }
          ],
          result
        }
      })
    }
    return aggregation
  }
}
