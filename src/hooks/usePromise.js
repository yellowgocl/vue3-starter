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
                state.isRejected = true;
                state.isPending = state.isFulfilled = !state.isRejected;
                reject(e)
            }
            if (!promise?.then) {
                onReject({ message: 'promise could not be null' })
                return 
            }
            promise.then(onResolve, onReject)
        })
        
    }
    return [state, wrapper]
}

export default usePromise
