import { defineStore } from 'pinia'
import { resetRouter } from '@/router'
import { usePermissionStore } from '@/store'
import { auth } from '@/utils'
const { toLogin, removeToken, getToken } = auth
import { api } from '@/services'

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: {},
    }
  },
  getters: {
    userId() {
      return this.userInfo?.id
    },
    name() {
      return this.userInfo?.name
    },
    avatar() {
      return this.userInfo?.avatar
    },
    role() {
      return this.userInfo?.role || []
    },
  },
  actions: {
    async getUserInfo() {
      try {
        const res = await api['user/get']()
        const { id, name, avatar, role } = res?.data || {}
        this.userInfo = { id, name, avatar, role }
        return Promise.resolve(res.data)
      } catch (error) {
        console.error('get user error:', error)
        return Promise.reject(error)
      }
    },
    async logout() {
      const { resetPermission } = usePermissionStore()
      removeToken()
      resetPermission()
      resetRouter()
      this.$reset()
      toLogin()
    },
    setUserInfo(userInfo = {}) {
      this.userInfo = { ...this.userInfo, ...userInfo }
    },
  },
})

export default useUserStore
