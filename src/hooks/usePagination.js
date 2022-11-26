import { computed, ref, reactive } from 'vue'
import { get, isArray, isString } from 'lodash'
import useRetry from './useRetry'
import useCounter from './useCounter'

const usePagination = (asyncFunc, options = {}) => {
    const { initial = 0, onReponse, size = 10, total, accumulate = true, onLoaded, keys = {}, retryTimes = Number.MAX_SAFE_INTEGER, consumedFilter } = options
    const { currentPage: currentPageKey = 'page', totalPage: totalPageKey = 'totalPage', data: dataKey = 'list' } = keys
    const [currentPage, pageActions] = useCounter(initial)
    const [asyncWrapper, asyncState] = useRetry(asyncFunc, { times: retryTimes, consumedFilter })
    const currentData = ref([])
    const totalPage = ref(total || Number.MAX_SAFE_INTEGER)

    const isFinished = computed(() => {
        return currentPage.value >= totalPage.value
    })

    const state = reactive({
        current: currentPage,
        data: currentData,
        finished: isFinished,
        total: totalPage,
    })

    const output = computed(() => ({
        current: currentPage.value,
        data: currentData.value,
        finished: isFinished.value,
        total: totalPage.value,
        ...asyncState.value
    }))

    const resetData = () => {
        currentData.value = []
        pageActions.set(1)
    }

    const base = async (nextPage, prevPage) => {
        
        try {
            if (asyncState.value.isPending || Number.isNaN(nextPage) || nextPage > totalPage.value || nextPage < 0 ) return;
            // const list = nextPage === 1 ? [] : currentData.value
            if (nextPage === 1) resetData()

            const response = await asyncWrapper(nextPage, size, totalPage.value)
            totalPage.value = get(response, totalPageKey) || total || Number.MAX_SAFE_INTEGER
            const parsedResponse = onReponse?.(response) || get(response, dataKey) || response
            if (!isArray(parsedResponse)) throw { message: 'response must be type of Array' }

            currentData.value = accumulate ? [].concat(currentData.value, parsedResponse).filter(Boolean) : parsedResponse
            return parsedResponse
        } catch (e) {
            console.error(e)
            pageActions.set(prevPage)
            throw e
        }
    }

    const next = async (delta = 1) => {
        const prevPage = currentPage.value
        const nextPage = pageActions.inc(delta)
        return await base(nextPage, prevPage)
    }
    const prev = async (delta = 1) => {
        const prevPage = currentPage.value
        const nextPage = pageActions.dec(delta)
        return await base(nextPage, prevPage)
    }
    const to = async (page = 1) => {
        const prevPage = currentPage.value
        const nextPage = page
        return await base(nextPage, prevPage)
    }

    const actions = { next, prev, to }

    return [actions, output]
}

export default usePagination
