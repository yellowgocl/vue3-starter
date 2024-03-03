import { onMounted } from 'vue'
import useService from './useService'

/**
 * useInitService
 * @template S
 * @param {string} key key
 * @param {*} [data] data
 * @returns {import('./useFetch').Results<S>} executor array
 */
function useInitService(key, data = {}) {
  const [caller, state, actions] = useService(key)

  onMounted(async () => {
    await caller(data)
  })

  return [caller, state, actions]
}

export default useInitService
