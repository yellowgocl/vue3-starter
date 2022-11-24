import { ref, reactive, computed } from 'vue'
import { get, reduce, isArray } from 'lodash'
import usePromise from './usePromise'

const ussPagination = (options = {}) => {
    const { initial = 0, size = 10, total, accumulate = true, onLoaded, keys = {} } = options
    const { currentPage: currentPageKey = 'page', totalPage: totalPageKey = 'total', data: dataKey = 'list' } = keys
    const [promiseState, wrapper] = usePromise()
    const currentPage = ref(initial)
    const currentData = ref([])
    const totalPage = ref(total || Number.MAX_SAFE_INTEGER)
    const isFinished = computed(() => {
        return currentPage.value >= totalPage.value
    })
    const state = reactive({
        currentPage, totalPage, isFinished
    })
    const output = computed(() => {
        return { ...state, ...promiseState, data: currentData.value || [] }
    })

    const next = async (onFetch, page) => {
        try {
            if (promiseState.isPending || isFinished.value) return;
            
            const nextPage = page >= 0 ? page : currentPage.value + 1
            if (nextPage === 1) currentData.value = []
            const response = await wrapper(onFetch?.(nextPage, size, totalPage.value))
            currentPage.value = get(response, currentPageKey) || nextPage
            totalPage.value = get(response, totalPageKey) || total || Number.MAX_SAFE_INTEGER
            onLoaded?.(response, currentPage.value >= totalPage.value, currentPage.value, size, totalPage.value)
            const cr = get(response, dataKey) || response
            
            currentData.value = accumulate ? [].concat(currentData.value, cr).filter(Boolean) : cr
            return response
        } catch (e) {
            console.error(e)
            throw e
        }
    }

    return [output, next]
}

export default ussPagination
