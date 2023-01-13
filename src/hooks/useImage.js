import { ref, computed } from 'vue'
import useRetry from './useRetry'

// const validReg = /\.(png|jpe?g|gif|svg|webp|tif|bmp)(\?.*)?$)/
const useImage = (src, options = {}) => {
    const { onLoad, onError } = options
    const currentLoader = ref(src)

    const asyncLoadImage = async (src) => {
        if (currentLoader?.current) {
            delete currentLoader?.current?.onerror
            delete currentLoader?.current?.onload
        }
        return new Promise((resolve, reject) => {
            const onLoadCallback = (e) => {
                onLoad?.(e)
                resolve(e)
            }
            const onErrorCallback = (e) => {
                onError?.(e)
                reject(e)
            }
            const current = new Image()
            currentLoader.current = current
            current.onload = onLoad
            current.onerror = onError
            current.src = src
        })
    }
    const [load, state] = useRetry(asyncLoadImage)
}

export default useImage
