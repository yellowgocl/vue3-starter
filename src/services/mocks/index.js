import { rest } from 'msw'
import { setupWorker } from 'msw'
import reduce from 'lodash/reduce'
import find from 'lodash/find'
import isBoolean from 'lodash/isBoolean'
import isFunction from 'lodash/isFunction'
import minimatch from "minimatch"
// import { handlers } from './handlers'

import config from '../config'

const mockModules = import.meta.globEager('./dummy/**/*.?(js|json)')

const handlers = reduce(config, (r, v, k) => {
    const method = v?.['method']
    const url = v?.['url']
    const result = rest[method](
        url,
        async (req, res, ctx) => {
            const mock = v?.['mock']
            const delay = v?.['delay'] || 1000
            const mockPath = isBoolean(mock) && !!mock ? url : mock
            const mockModule = isFunction(mockPath) 
                ? { default: mockPath }
                : find(mockModules, (v, k) => (minimatch(k, `${mockPath}.?(js{,on})`)))
            let statusCode = 200
            let response
            try {
                response = isFunction(mockModule?.default) ? await mockModule?.default(req) : mockModule?.default
                // if (!response) statusCode = 404

                const resultCode = !!response ? 1 : 0
                const message = resultCode ? 'SUCCESS' : 'Unknow error.'
                response = { resultCode, message, ...response }
            } catch (e) {
                console.warn('mock error:', e)
                statusCode = e?.statusCode || e?.status || 500
                response = e?.response || e?.message || e
            }
            
            return res(
                ctx.delay(delay),
                ctx.status(statusCode),
                ctx.json(response)
            )
        }
    )
    r.push(result)
    return r
}, [])

export const worker = setupWorker(...handlers)

export default worker
