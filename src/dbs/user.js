/**
 * Module for managing the dbs for user
 * @module dbs/user
 */
'use strict'

const path = require('path')
const filename = path.basename(__filename, '.js')
const model = require('@src/models/' + filename)

module.exports = {
  /**
   * Call mongodb for adding an user to the database
   * @param {User} user The user to add to the database
   * @return {User} The user added with the id
   **/
  insert: (user) => {
    return model.create(user)
  },
  /**
   * Call mongodb for getting an user by login
   * @param {String} login The login to search
   * @return {User} The user found or null
   **/
  get_user_by_login: (login) => {
    return model.findOne({ $or: [{ email: login }, { username: login }] })
  },
  /**
   * Call mongodb for getting an user by id
   * @param {String} id The id to search
   * @return {User} The user found or null
   **/
  get_user_by_id: (id) => {
    return model.findOne({ _id: id })
  },
  /**
   * Call mongodb for inserting many
   * @param {Array[]} user Contain an array of user
   * @return {companies} return the array of user saved
   */
  insert_many: (user) => {
    return model.insertMany(user)
  },
  /**
   * Update a document in mongodb respecting the condtion
   * @param {Object} filter The condition the document has to respect
   * @param {Object} update The update to apply
   * @return {User} The document updated or null
   **/
  update_by_id: (_id, update) => {
    return model.findOneAndUpdate({ _id: _id }, update, { new: true })
  },
  /**
   * Call mongodb for testing the existence of an user by email
   * @param {String} username The username to search
   * @return {boolean} True if a document exist or else False
   **/
  test_user_by_email: (email) => {
    return model.exists({ email: email })
  }
}
