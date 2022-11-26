import { faker } from '@faker-js/faker';
faker.setLocale('zh_CN');
/**
 * {
        "resultCode":1,"resultCode":1,
        "message":"SUCCESS""message":"SUCCESS"
}
 */

const contractnoReg = /^[1-9]/

export default (req) => {
    const searchParams = req.url.searchParams
    const account = searchParams.get('account')
    const contractno = searchParams.get('contractno')
    if (!account) {
        throw { statusCode: 403, message: `account must could not be null. current: ${account}` }
    }
    if (!contractno || !contractnoReg.test(contractno)) {
        throw { statusCode: 401, message: `contractno must could not be null. current: ${contractno}` }
    }
    return {
        "object":{
            "contractName": '广州市建设工程施工合同',
            "appUserName": faker.name.fullName(),
        }
    }
    
}
