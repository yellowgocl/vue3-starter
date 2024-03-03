import useService from '../useService'

/**
 * @typedef {object} UserInfo
 * @property {string} access_token access_token
 * @property {string} openid openid
 * @property {string} nickname nickname
 * @property {string} avatar avatar
 */
/**
 * @param {import('@/hooks/useFetch').Option} options
 * @returns {import('@/hooks/useFetch').Results<UserInfo>} results
 */

function useGetWechatUserInfo(options) {
  const [service, state, actions] = useService('wechat/auth', options)
  const wrapper = async (data, config) => {
    return await service(data, { ...config, method: 'post' })
  }
  return [wrapper, state, actions]
}

export default useGetWechatUserInfo
