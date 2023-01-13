import { ref, onBeforeUnmount } from 'vue'
import useRetry from './useRetry'

const useApi = (asyncFunc, options = {}) => {
    const { abortOnUnmount = true, abortOnPending = false, retryTimes = Number.MAX_SAFE_INTEGER, consumedFilter: outerConsumedFilter, ...rest } = options
    const controller = ref(new AbortController());
    const consumedFilter = (error) => {
        if (error?.name === "CanceledError") return false
        return outerConsumedFilter?.(error)
    }
    const [retryWrapper, retryState, retryActions] = useRetry(asyncFunc, { consumedFilter, retryTimes,  ...rest })

    const cancel = async () => {
        controller.value?.abort?.()
    }
    
    onBeforeUnmount(() => {
        console.info('useApi onBeforeUnmount')
        abortOnUnmount && cancel()
    })

    const wrapper = async (data, wrapperOptions) => {
        if (retryState.isPending && !abortOnPending) return
        
        abortOnPending && cancel()

        const fetch = async() => {
            const abortController = new AbortController()
            controller.value = abortController
            return await retryWrapper(data, { ...wrapperOptions, signal: abortController.signal })
        }
        
        return !abortOnPending ? await fetch() : new Promise((resolve, reject) => {
            setTimeout(async () => {
                try {
                    resolve(await fetch())
                } catch (e) {
                    reject (e)
                }
            })
        })
    }

    const actions = {
        ...retryActions,
        cancel,
    }

    return [wrapper, retryState, actions]
}

export default useApi
