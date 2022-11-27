import { ref, reactive, onMounted, computed } from 'vue'
import { isFunction } from 'lodash'

const usePromise = (promiseWrapper, options = {}) => {
    const isPending = ref(false)
    const isFulfilled = ref(false)
    const isRejected = ref(false)
    const state = computed(() => ({ isPending: isPending.value, isFulfilled: isFulfilled.value, isRejected: isRejected.value }))
    const wrapper = (...params) => {
        // if (isPending.value) return
        const promise = isFunction(promiseWrapper) ? promiseWrapper?.apply(null, params) : promiseWrapper
        isPending.value = true
        isFulfilled.value = isRejected.value = !isPending.value;
        return new Promise((resolve, reject) => {
            const onResolve = (v) => {
                isFulfilled.value = true
                isPending.value = isRejected.value = !isFulfilled.value;
                resolve(v)
            }
            const onReject = (e) => {
                isRejected.value = true;
                isPending.value = isFulfilled.value = !isRejected.value;
                reject(e)
            }
            if (!promise?.then) {
                onReject({ message: 'promise could not be null' })
                return 
            }
            promise.then(onResolve, onReject)
        })
    }
    return [wrapper, state]
}

export default usePromise
