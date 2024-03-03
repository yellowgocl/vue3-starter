/** @module hooks/useRetry */

import { computed } from 'vue'
import usePromise from './usePromise'
import useCounter from './useCounter'

/**
 * @callback useRetryConsumedFilter
 * @param {Error} e
 * @returns {boolean|undefined} flag
 */

/**
 * @typedef {object} useRetryBaseOption
 * @property {number} [times = Number.MAX_SAFE_INTEGER] times
 * @property {useRetryConsumedFilter} [consumedFilter] consumedFilter
 */

/**
 * @typedef {object} RetryActions
 * @property {import('./useCounter').ResetValueCall} reset reset the value, default initial value from pass in hook
 */

/**
 * @typedef {import('./usePromise').usePromiseOption & useRetryBaseOption} useRetryOption
 */

/**
 * @typedef {object} PromiseStateObject
 * @property {number} retryTimes retry times
 * @property {boolean} isEnd is the end of the retry count for this retry hook for wrapper promise
 */

/**
 * @template S
 * @typedef {import('./usePromise').usePromiseState<S> & import('vue').ComputedRef<({[K in keyof PromiseStateObject]: PromiseStateObject[K]})>} RetryState
 */

/**
 *
 * @template T,S
 * @param {import('./usePromise').usePromiseCall} asyncFunc
 * @param {{ [K in keyof useRetryOption]: useRetryOption[K] }} options
 * @returns {[import('./usePromise').usePromiseWrapper.<T>, RetryState<S>, RetryActions]}
 */

function useRetry(asyncFunc, options = {}) {
  const { times = Number.MAX_SAFE_INTEGER, consumedFilter, ...rest } = options

  const [retryTimes, retryActions] = useCounter(times)
  const [asyncWrapper, asyncState] = usePromise(asyncFunc, rest)

  const isEnd = computed(() => {
    return retryTimes.value === 0
  })
  const reset = (initial) => {
    return retryActions.reset(initial)
  }
  const actions = { reset }

  const output = computed(() => ({
    isEnd: isEnd.value,
    retryTimes: retryTimes.value,
    ...asyncState.value,
  }))

  const wrapper = async (...params) => {
    try {
      if (isEnd.value)
        throw new Error('reached maximum times of retries')

      return await asyncWrapper(...params)
    }
    catch (e) {
      const consumedFlag = consumedFilter?.(e) === false ? false : !isEnd.value
      const remainingTimes = consumedFlag ? retryActions.dec() : retryTimes.value
      const errorObject = Object.assign(e, { remainingTimes })
      throw errorObject
    }
  }

  return [wrapper, output, actions]
}

export default useRetry
