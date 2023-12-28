import { ref } from 'vue'

function useError() {
  const currentError = ref()
  return (error) => {
    currentError.value = error
    console.error(error)
    throw error
  }
}

export default useError
