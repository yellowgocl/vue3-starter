import { nextTick, onBeforeUnmount, ref } from 'vue'
import useRetry from './useRetry'

/**
 * @typedef {object} useFetchBaseOption
 * @property {boolean} [abortOnUnmount = true] abort when unmount
 * @property {boolean} [abortOnPending = false] abort when pending
 */

/**
 * @typedef {import('./useRetry').useRetryOption & useFetchBaseOption} Option
 */

/**
 * @callback CancelCall
 * @returns {void}
 */

/**
 * @typedef {object} useFetchActions
 * @property {Function} cancel cancel
 */

/**
 * @typedef {import('./useRetry').RetryActions & useFetchActions} Actions
 */

/**
 * @template S
 * @typedef {[import('@/services/api').ApiCall, import('./useRetry').RetryState<S>, Actions]} Results
 */

/**
 *
 * @template S
 * @param {import('./usePromise').usePromiseCall} asyncFunc
 * @param {{ [K in keyof Option]: Option[K] }} options
 * @returns {Results<S>} results
 */

function useFetch(asyncFunc, options = {}) {
  const { abortOnUnmount = true, abortOnPending = false, times = Number.MAX_SAFE_INTEGER, consumedFilter: outerConsumedFilter, ...rest } = options
  const controller = ref(new AbortController())

  /**
   * @type {import('./useRetry').useRetryConsumedFilter}
   */
  const consumedFilter = (error) => {
    if (error?.name === 'CanceledError')
      return false
    return outerConsumedFilter?.(error)
  }
  const [retryWrapper, retryState, retryActions] = useRetry(asyncFunc, { consumedFilter, times, ...rest })

  const cancel = async () => {
    controller.value?.abort?.()
  }
  onBeforeUnmount(() => {
    abortOnUnmount && cancel()
  })

  /**
   * @type {import('@/services/api').ApiCall}
   */
  const wrapper = async (data, wrapperOptions) => {
    if (retryState.value.isPending && !abortOnPending)
      return

    if (abortOnPending) {
      cancel()
      await nextTick()
    }

    const fetch = async () => {
      const abortController = new AbortController()
      controller.value = abortController
      return await retryWrapper(data, { ...wrapperOptions, signal: abortController.signal })
    }
    return fetch()
  }

  const actions = {
    ...retryActions,
    cancel,
  }

  return [wrapper, retryState, actions]
}
export default useFetch
