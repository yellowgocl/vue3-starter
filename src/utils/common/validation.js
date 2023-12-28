import { isNil } from 'lodash'

export const isWhitespace = val => val === ''
export const isNullOrWhitespace = val => isNil(val) || isWhitespace(val)
