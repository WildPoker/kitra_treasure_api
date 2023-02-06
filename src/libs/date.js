/**
* Set of global functions or constants about date
* @module libs/date
*/
'use strict'

const moment = require('moment')
const moment_timezone = require('moment-timezone')

module.exports = {
  /**
  * Get the date of yesterday
  **/
  yesterday: () => {
    const date = new Date()
    date.setDate(date.getDate() - 1)
    return date
  },
  /**
  * @param {String} date
  */
  set_date: date => {
    return new Date(date)
  },
  /**
   * Convert a date by timezone to localstring
   * @param {Date} date - the date
   * @param {String} timezone - the timezone name
   */
  date_to_localstring_by_timezone: (date, timezone = 'UTC') => {
    if (!date) {
      return null
    }
    return date.toLocaleString('en-US', { timeZone: timezone })
  },
  /**
   * Get the offset by minutes in timezone
   * @param {String} timezone - the timezone name
   */
  get_offset_minutes_by_timezone: (timezone = 'UTC') => {
    return moment_timezone.tz(timezone).utcOffset()
  },
  /**
   * Convert a date by timezone to localstring
   * @param {Date} date - the date
   * @param {String} timezone - the timezone name
   */
  set_date_by_offset: (date, offset) => {
    if (!date || offset === undefined) {
      throw new Error('Please provide date and offset')
    }
    if (offset === 0) {
      return new Date(date)
    }
    return moment.utc(date).subtract(offset, 'minutes')
  },
  /**
   * Get how many days in a month
   * @param {Int} month - Contain what month
   * @param {Int} year - Contain what year
   * @return {Int} - Return the int of how many days in month
   */
  get_days_in_month: (month = new Date().getUTCMonth(), year = new Date().getUTCFullYear()) => {
    return new Date(year, month, 0).getDate()
  },
  /** Return an array of object contain day and int */
  get_day_in_array: (day) => {
    const day_array = [{ day: 'SUNDAY', int: 0 }, { day: 'MONDAY', int: 1 }, { day: 'TUESDAY', int: 2 }, { day: 'WEDNESDAY', int: 3 }, { day: 'THURSDAY', int: 4 }, { day: 'FRIDAY', int: 5 }, { day: 'SATURDAY', int: 6 }]
    const day_map = day_array.map(obj => {
      return obj.day === day ? obj : null
    })
    return (day_map.filter(x => x))[0]
  },
  get_date_of_next_week_by_day: async (dayName, excludeToday = true, refDate = new Date()) => {
    const dayOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
      .indexOf(dayName.slice(0, 3).toLowerCase())
    if (dayOfWeek < 0) return
    refDate.setDate(refDate.getDate() + +!!excludeToday + (dayOfWeek + 7 - refDate.getDay() - +!!excludeToday) % 7)
    return refDate
  }
}
