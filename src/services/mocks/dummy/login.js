import { faker } from '@faker-js/faker';
faker.setLocale('zh_CN');
/**
 * {
        "resultCode":1,"resultCode":1,
        "message":"SUCCESS""message":"SUCCESS"
}
 */

const ALLOW_ACCOUNTS = [
    "1234", "1111", "1", "1234567", "1111111", "0000000", "0"
]

export default (req) => {
    const { account } = req.body || {}
    if (!account) {
        throw { statusCode: 403, message: `account must could not be null. current: ${account}` }
    }

    const resultCode = ALLOW_ACCOUNTS.some(v => v === account) ? 1 : 0
    const message = resultCode == 1 ? "success" : `Access deined by ${account}`
    
    return {
        resultCode,
        message
    }
    
}
