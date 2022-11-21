import { ref, reactive, onMounted } from 'vue'

const usePromise = (outerPromise) => {
    // const promise = ref(outerPromise)
    const isPending = ref(false)
    const isFulfilled = ref(false)
    const isRejected = ref(false)
    const state = reactive({ isPending, isFulfilled, isRejected })

    const wrapper = (promise) => {
        state.isPending = true
        state.isFulfilled = state.isRejected = !state.isPending;
        return new Promise((resolve, reject) => {
            const onResolve = (v) => {
                state.isFulfilled = !!v
                state.isPending = state.isRejected = !state.isFulfilled;
                resolve(v)
            }
            const onReject = (e) => {
                console.error('inject:', e)
                state.isRejected = true;
                state.isPending = state.isFulfilled = !state.isRejected;
                reject(e)
            }

            promise.then(onResolve, onReject)
        })
        
    }
    return [state, wrapper]
}

export default usePromise
