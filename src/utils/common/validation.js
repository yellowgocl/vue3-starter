import { isNull, isNil, isUndefeined } from 'lodash'
export const isWhitespace = (val) => val === ''
export const isNullOrWhitespace = (val) => isNil(val) || isWhitespace(val)