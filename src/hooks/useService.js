import { inject } from 'vue'
import { useFetch } from '@/hooks'

function useService(key) {
  const services = inject('api')
  const current = services[key]
  if (!current)
    throw new Error(`${key} was not found in api list, is defined in {projectRoot}/src/services/config.js ?`)

  return useFetch(current)
}

export default useService
