const getAccountData = () => {
    try {
        const accountData = JSON.parse(sessionStorage.getItem('staff') || '{}')
        return accountData
    } catch (e) {
        return null
    }
}
const parseRequestData = () => {
    return {
        account: getAccountData()?.account
    }
}
const config = {
    'login': {
        url: '/api/login',
        method: 'post',
        mock: './dummy/login'
    },
    'scanned': {
        url: '/api/contract/scanned',
        method: 'get',
        mock: './dummy/contract/scanned',
        params: parseRequestData,
        delay: () => Math.ceil(Math.random() * 3000),
    },
    'beScanned': {
        url: '/api/contract/beScanned',
        method: 'get',
        mock: './dummy/contract/beScanned',
        params: parseRequestData
    },
    'user/get': {
        url: '/api/user',
        method: 'get',
        mock: './dummy/user/get',
    },
    'numberQuery':{
        url: '/api/numberQuery',
        method: 'get',
        mock: './dummy/numberQuery',
        params: parseRequestData
    },
    'contractFiling':{
        url: '/api/contractFiling',
        method: 'post',
        mock: './dummy/contractFiling',
        data: parseRequestData
    },
}

export default config
