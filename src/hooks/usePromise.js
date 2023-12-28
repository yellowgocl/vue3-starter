import { computed, ref } from 'vue'
import { isFunction } from 'lodash'

function usePromise(promiseWrapper, options = {}) {
  if (!promiseWrapper)
    console.error('The async method could not be null')

  const { immediately = true } = options
  const isPending = ref(false)
  const isFulfilled = ref(false)
  const isRejected = ref(false)
  const result = ref(null)
  const state = computed(() => ({ result: result.value, isPending: isPending.value, isFulfilled: isFulfilled.value, isRejected: isRejected.value }))
  const wrapper = (...params) => {
    if (isPending.value)
      return
    const promise = isFunction(promiseWrapper) ? promiseWrapper?.(...params) : promiseWrapper
    isPending.value = true
    isFulfilled.value = isRejected.value = !isPending.value
    return new Promise((resolve, reject) => {
      const onResolve = (v) => {
        resolve(v)
        const update = () => {
          isFulfilled.value = true
          isPending.value = isRejected.value = !isFulfilled.value
        }
        immediately ? update() : setTimeout(update)
      }
      const onReject = (e) => {
        reject(e)
        const update = () => {
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
