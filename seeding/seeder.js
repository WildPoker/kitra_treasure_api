'use strict'

require('module-alias/register')
const utils = require('@src/libs/utils')
const mode = utils.mode(process.env.NODE_ENV)
require('dotenv').config({ path: './env/.env.' + mode })
const path = require('path')
const { Seeder } = require('mongo-seeding')
/**
 * Seed the database with the informations in data
 **/
const seeder = new Seeder({
  database: process.env.DB_URI_DATA + process.env.DB_NAME,
  dropDatabase: true
})

const collectionReadingOptions = {
  transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId]
}

const collections = seeder.readCollectionsFromPath(path.resolve('./seeding/datas'), collectionReadingOptions)

seeder.import(collections)
