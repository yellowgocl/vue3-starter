import { computed, nextTick, ref } from 'vue'
import { isFunction } from 'lodash'

/**
 * @function
 * @callback usePromiseCall
 * @param {...*} args
 * @returns {(undefined | Promise<*>)} resolved promise
 */

/**
 * @function
 * @template T
 * @callback usePromiseWrapper
 * @param {...*} args
 * @returns {Promise<T>} resolved promise
 */

/**
 * @typedef {object} usePromiseOption option for custom define usePromise hook
 * @property {boolean} [immediately=true] flag for order is immediately update when resolve
 */

/**
 * @template T
 * @typedef {object} usePromiseStateObject usePromiseStateObject
 * @property {T|null} result result
 * @property {boolean} isPending isPending
 * @property {boolean} isFulfilled isFulfilled
 * @property {boolean} isRejected isRejected
 */

/**
 * @template T
 * @typedef {import('vue').ComputedRef<{[K in keyof usePromiseStateObject<T>]: usePromiseStateObject<T>[K]}>} usePromiseState state for hook
 */

/**
 * usePromise hook, for wrapper promise and return compouted state
 * @template T, S
 * @param {usePromiseCall} promiseWrapper
 * @param {{[K in keyof usePromiseOption]: usePromiseOption[K]}} options
 * @returns {[usePromiseWrapper<T>, usePromiseState<S>]} an array includes state and promise wrapper
 */
function usePromise(promiseWrapper, options = {}) {
  if (!promiseWrapper)
    console.error('The async method could not be null')

  const { immediately = true } = options
  const isPending = ref(false)
  const isFulfilled = ref(false)
  const isRejected = ref(false)
  const result = ref(null)
  const state = computed(() => ({ result: result.value, isPending: isPending.value, isFulfilled: isFulfilled.value, isRejected: isRejected.value }))
  /**
   *
   * @param  {...any} params
   * @returns {*} results
   */
  const wrapper = (...params) => {
    if (isPending.value)
      return
    const promise = isFunction(promiseWrapper) ? promiseWrapper?.(...params) : promiseWrapper
    isPending.value = true
    isFulfilled.value = isRejected.value = !isPending.value
    return new Promise((resolve, reject) => {
      const onResolve = async (v) => {
        resolve(v)
        const update = () => {
          result.value = v
          isFulfilled.value = true
          isPending.value = isRejected.value = !isFulfilled.value
        }
        immediately && await nextTick()
        update()
      }
      const onReject = (e) => {
        reject(e)
        const update = () => {
          result.value = e
          isRejected.value = true
          isPending.value = isFulfilled.value = !isRejected.value
        }
        immediately ? update() : setTimeout(update)
      }
      if (!promise?.then) {
        onReject({ message: 'promise could not be null' })
        return
      }
      promise.then(onResolve, onReject)
    })
  }
  return [wrapper, state]
}

export default usePromise
