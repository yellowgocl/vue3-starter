import { HttpResponse, http as rest } from 'msw'
import { setupWorker } from 'msw/browser'
import reduce from 'lodash/reduce'
import find from 'lodash/find'
import isBoolean from 'lodash/isBoolean'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'
import { minimatch } from 'minimatch'

// import { handlers } from './handlers'

import config from '../config'

const mockModules = import.meta.glob('./dummy/**/*.?(js|json)', { eager: true })

const handlers = reduce(config, (r, v, _k) => {
  const method = v?.method
  const url = v?.url
  const result = rest?.[method](
    url,
    async (req) => {
      const mock = v?.mock
      const mockPath = isBoolean(mock) && !!mock ? url : mock
      const mockModule = isFunction(mockPath)
        ? { default: mockPath }
        : find(mockModules, (v, k) => (minimatch(k, `${mockPath}.?(js{,on})`)))
        try{
          const mockData = isFunction(mockModule?.default) ? await mockModule?.default(req) : mockModule?.default
          const ifNeedParse = !(mockData instanceof Response)
          return (ifNeedParse 
            ? new Response(JSON.stringify(mockData ?? { statusCode: 404, data: null }))
            : mockData)
        } catch(e) {
          return HttpResponse.error(e)
        }
    },
  )
  r.push(result)
  return r
}, [])

export const worker = setupWorker(...handlers)
const startOptions = {
  onUnhandledRequest: 'bypass',
}

async function setup() {
  if (import.meta.env.VITE_USE_MOCK === 'true') {
    return worker.start(startOptions).then(() => {
      console.groupCollapsed('[MSW] Loaded with handlers 🎉')
      worker.listHandlers().forEach((handler) => {
        console.log(handler.info.header)
      })
      console.groupEnd()
      return null
    })
  }
}

export default setup
