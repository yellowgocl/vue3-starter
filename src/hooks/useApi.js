import { ref } from 'vue'
const useApi = (service, options) => {
    const { stopPropagation = false } = options
    const isLoading = ref(false)
    const error = ref()

    const call = async (params, options) => {
        if (isLoading) return;

        try {
            isLoading.value = true
            const result = await service(params, options)
            isLoading.value = false
        } catch (e) {
            console.error(e)
            if (!stopPropagation) {
                throw e
            }
            error.value = e
        }
    }
    const reset = () => {
        error.value = null
    }

    return [{ isLoading, error, response }, call, reset]
}