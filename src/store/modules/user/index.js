import { defineStore } from 'pinia'
import { resetRouter } from '@/router'
import { usePermissionStore } from '@/store'
import { auth } from '@/utils'
const { toLogin, removeToken } = auth
// import api from '@/api'

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
        const res = { data: {
          id: 1,
          name: '大脸怪(admin)',
          avatar: 'https://static.isme.top/images/avatar.jpg',
          email: 'Ronnie@123.com',
          role: ['admin'],
        }}
        const { id, name, avatar, role } = res.data
        this.userInfo = { id, name, avatar, role }
        return Promise.resolve(res.data)
      } catch (error) {
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
