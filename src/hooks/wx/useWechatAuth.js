import useService from '../useService'

// import { getAuthUrlApi, wechatAuthApi } from '@/api/wechat'

// interface UserInfo {
//   access_token: string;
//   openid: string;
//   nickname: string;
//   avatar: string;
// }

/**
 * hook for jump to wechat auth
 * @param {import('@/hooks/useFetch').Option} [options]
 * @returns {import('@/hooks/useFetch').Results<string>} useFetch results
 */
function useWechatAuth(options) {
  const [service, state, actions] = useService('wechat/auth', { ...options })
  const wrapper = async (callbackUrl, config) => {
    const authUrl = await service({}, {
      params: { redirect_url: callbackUrl },
      method: 'get',
      ...config,
    })

    const redirectUrl = import.meta.env.DEV ? `${callbackUrl}?code=test` : authUrl
    window.location.href = redirectUrl
    return redirectUrl
  }
  return [wrapper, state, actions]
}

export default useWechatAuth
