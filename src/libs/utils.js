/**
 * Set of global functions or constants about utils
 * @module libs/utils
 */
'use strict'
require('isomorphic-fetch')

module.exports = {
  /**
   * Return the mode of node or affect one if none has been given
   * @param {string} node_env The mode of node
   * @return {string} The mode of node
   **/
  mode: (node_env) => {
    return node_env !== undefined ? node_env.trim() : 'development'
  },
  /**
   * Return the result of a graphql query
   * @params {Object} query The graphql query
   * @params {String} bearer The bearer token to add for authenticate query
   * @return {Object} The result of the query
   **/
  getter: async (query, bearer = null, endpoint) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    }

    if (bearer !== null) {
      options.headers.Authorization = 'Bearer ' + bearer
      options.credentials = 'include'
      options.withCredentials = true
      options.headers.Accept = 'application/json'
    }

    const response = await fetch(endpoint, options)
    const response_json = await response.json()
    return response_json.errors !== undefined ? response_json : response_json.data
  },
  /**
  * Return the result of a graphql query
  * @params {Object} query The graphql query
  * @params {String} bearer The bearer token to add for authenticate query
  /**
  * @return {Object} The result of the query
  **/
  getter_user_microservice: async (query, bearer = null) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query)
    }
    if (bearer !== null) {
      options.headers.Authorization = 'Bearer ' + bearer
      options.credentials = 'include'
      options.withCredentials = true
      options.headers.Accept = 'application/json'
    }
    const response = await fetch(process.env.URL_USER_MICROSERVICE, options)
    const response_json = await response.json()
    return response_json.errors !== undefined ? response_json : response_json.data
  }
}
