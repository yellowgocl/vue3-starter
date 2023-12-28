import { nextTick, onBeforeUnmount, ref } from 'vue'
import useRetry from './useRetry'

function useFetch(asyncFunc, options = {}) {
  const { abortOnUnmount = true, abortOnPending = false, retryTimes = Number.MAX_SAFE_INTEGER, consumedFilter: outerConsumedFilter, ...rest } = options
  const controller = ref(new AbortController())
  const consumedFilter = (error) => {
    if (error?.name === 'CanceledError')
      return false
    return outerConsumedFilter?.(error)
  }
  const [retryWrapper, retryState, retryActions] = useRetry(asyncFunc, { consumedFilter, retryTimes, ...rest })

  const cancel = async () => {
    controller.value?.abort?.()
  }

  onBeforeUnmount(() => {
    abortOnUnmount && cancel()
  })

  const wrapper = async (data, wrapperOptions) => {
    if (retryState.isPending && !abortOnPending)
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
    return await fetch()
    // return !abortOnPending ? await fetch() : new Promise((resolve, reject) => {
    //     setTimeout(async () => {
    //         try {
    //             resolve(await fetch())
    //         } catch (e) {
    //             reject (e)
    //         }
    //     })
    // })
  }

  const actions = {
    ...retryActions,
    cancel,
  }

  return [wrapper, retryState, actions]
}

export default useFetch
