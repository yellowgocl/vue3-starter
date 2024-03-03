import wx from 'weixin-js-sdk'

/**
 * @readonly
 * @enum {string}
 */

/**
 * Enum of ShareType value
 * @readonly
 */
export const SHARE_TYPE = {
  /**
   * @type {'link'}
   */
  link: 'link',
  /**
   * @type {'video'}
   */
  video: 'video',
  /**
   * @type {'image'}
   */
  image: 'image',
}

/**
 * Gets the Value Type of TModel given a keyof TModel, TModelKey
 * @typedef {(keyof typeof SHARE_TYPE)} ShareTypeValue
 */

/**
 * @typedef {object} ShareInfo share info config object
 * @property {string} title share title
 * @property {string} link share link
 * @property {string} imgUrl share imgUrl
 * @property {string} desc share desc
 * @property {(ShareTypeValue)} [type] share type, default link
 */

/**
 * @typedef {import('weixin-js-sdk').default.ApiMethod[]} WechatApiMethod
 */

/**
 * @type {WechatApiMethod}
 */
const DEFAULT_JS_API_LIST = [
  'chooseImage',
  'uploadImage',
  'previewImage',
  'onMenuShareTimeline',
  'onMenuShareAppMessage',
  'chooseWXPay',
]

/**
 * @typedef {object} WXConfig
 * @property {string} appId - 必填，公众号的唯一标识
 * @property {number} timestamp - 必填，生成签名的时间戳
 * @property {string} nonceStr - 必填，生成签名的时间戳
 * @property {string} signature - 必填，签名，见附录1
 * @property {WechatApiMethod} jsApiList - 必填，需要使用的JS接口列表，所有JS接口列表见附录2
 * @property {*} [openTagList] - 选填，wx.openTagList
 * @property {boolean} [debug] - 选填，是否开启debug模式
 */

/**
 *
 * @callback SetupCallback - setup weixin sdk
 * @param {{[K in keyof WXConfig]: WXConfig[K]}} config weixin sdk config
 * @returns {Promise<boolean>} - flag if sdk on ready
 */

/**
 * @callback ShareCallback share weixin callback
 * @param {{[K in keyof ShareInfo]: ShareInfo[K]}} config share config
 * @return {Promise<ShareInfo>} promise
 */

/**
 *
 * @returns {{setup: SetupCallback, share: ShareCallback, checkIfIOS: () => boolean}} weixin sdk
 */
function useWeixinSDK() {
  /**
   *
   * @function
   * @type {SetupCallback}
   */
  const setup = (config) => {
    return new Promise((resolve) => {
      const { debug = false, jsApiList: outerJsApiLIst, ...rest } = config
      const parsedConfig = {
        debug,
        jsApiList: outerJsApiLIst ?? DEFAULT_JS_API_LIST,
        ...rest,
      }
      wx.config(parsedConfig)
      wx.ready(() => {
        resolve(true)
      })
    })
  }

  /**
   *
   * @type {ShareCallback}
   */
  const share = async (shareInfo) => {
    return new Promise((resolve, reject) => {
      wx.onMenuShareTimeline({
        title: shareInfo.title, // 分享标题
        link: shareInfo.link, // 分享链接，可以不是当前页面，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareInfo.imgUrl,
        success() {
          // 用户确认分享后执行的回调函数
          resolve(shareInfo)
        },
        cancel() {
          reject(shareInfo)
          // 用户取消分享后执行的回调函数
        },
      })
      wx.onMenuShareAppMessage({
        title: shareInfo.title, // 分享标题
        desc: shareInfo.desc,
        link: shareInfo.link, // 分享链接，可以不是当前页面，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareInfo.imgUrl,
        type: 'link', // 分享类型,music、video或link，不填默认为link
        success() {
          // 用户确认分享后执行的回调函数
          resolve(shareInfo)
        },
        cancel() {
          // 用户取消分享后执行的回调函数
          reject(shareInfo)
        },
      })
    })
  }

  /**
   * @function
   * @returns {boolean} return flag for check if ios
   */
  const checkIfIOS = () => {
    return true
  }

  return {
    setup,
    share,
    checkIfIOS,
  }
}

export default useWeixinSDK
