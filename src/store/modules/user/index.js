import { defineStore } from 'pinia'
import { resetRouter } from '@/router'
import { usePermissionStore } from '@/store'
import { auth } from '@/utils'
const { toLogin, removeToken } = auth
import { api } from '@/services'

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: {},
    }
  },
  getters: {
    isLogged() {
      return !!this.userInfo?.id
    },
    id() {
      return this.userInfo?.id
    },
    name() {
      return this.userInfo?.name
    },
    avatar() {
      return this.userInfo?.avatar
    },
    email() {
      return this.userInfo?.email
    },
    phone() {
      return this.userInfo?.phone
    },
    role() {
      return this.userInfo?.role || []
    },
  },
  actions: {
    async getUserInfo() {
      try {
        const res = await api['user/get']()
        this.userInfo = { ...res?.data }
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
