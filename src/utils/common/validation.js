import { isNil } from 'lodash'

export const isWhitespace = val => val === ''

/**
 *
 * @param {*} val -any value
 * @returns {*} if value is blank or null or undefined with true, else false
 */
export const isNullOrWhitespace = val => isNil(val) || isWhitespace(val)
