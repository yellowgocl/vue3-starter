import usePromise from './usePromise'
import useCounter from './useCounter'

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
