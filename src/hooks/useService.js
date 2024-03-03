/** @module hooks/useService */
import { inject } from 'vue'
import { useFetch } from '@/hooks'

/**
 * @template S
 * @param {string} key key from root api provide
 * @param {import('./useFetch').Option} [options] fetch options
 * @returns {import('./useFetch').Results<S>} result of services reponse
 */

function useService(key, options) {
  const services = inject('api')
  const current = services[key]
  if (!current)
    throw new Error(`${key} was not found in api list, is defined in {projectRoot}/src/services/config.js ?`)

  return useFetch(current, options)
}

export default useService
