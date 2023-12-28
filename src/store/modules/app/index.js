import { defineStore } from 'pinia'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark(true)
const toggleDark = useToggle(isDark)
export const useAppStore = defineStore('app', {
  state() {
    return {
      collapsed: false,
      isDark,
    }
  },
  actions: {
    switchCollapsed() {
      this.collapsed = !this.collapsed
    },
    setCollapsed(collapsed) {
      this.collapsed = collapsed
    },
    /** 设置暗黑模式 */
    setDark(isDark) {
      this.isDark = isDark
    },
    /** 切换/关闭 暗黑模式 */
    toggleDark() {
      toggleDark()
    },
  },
})
export default useAppStore
