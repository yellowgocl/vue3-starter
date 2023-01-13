import { ref, watch } from 'vue'
const useError = () => {
    const currentError = ref()
    return (error) => {
        currentError.value = error
        console.error(error)
        throw error
    }
} 

export default useError
