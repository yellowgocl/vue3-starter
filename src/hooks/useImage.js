import { ref } from 'vue'
import useRetry from './useRetry'

function useImage(options = {}) {
  const { onLoad, onError } = options
  const currentLoader = ref()

  const asyncLoadImage = async (src) => {
    if (currentLoader?.current) {
      delete currentLoader?.current?.onerror
      delete currentLoader?.current?.onload
    }
    return new Promise((resolve, reject) => {
      const onLoadCallback = (e) => {
        onLoad?.(e)
        resolve(e)
        console.info(e)
      }
      const onErrorCallback = (e) => {
        onError?.(e)
        reject(e)
        console.error(e)
      }
      const current = new Image()
      current.onload = onLoadCallback
      current.onerror = onErrorCallback
      current.src = src
      currentLoader.current = current
    })
  }
  const [load, state] = useRetry(asyncLoadImage)
  return [load, state]
}

export default useImage
