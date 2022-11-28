const getAccountData = () => {
    try {
        const accountData = JSON.parse(sessionStorage.getItem('staff') || '{}')
        return accountData
    } catch (e) {
        return null
    }
}
const parseRequestData = () => {
    console.info('parseRequestData')
    return {
        account: getAccountData()?.account
    }
}
const config = {
    'login': {
        url: '/tms/newContract/newContract.do',
        method: 'post',
        mock: './dummy/login',
        params: { method: 'pdaLogin' }
    },
    'scanned': {
        url: '/contract/scanned',
        method: 'get',
        mock: './dummy/contract/scanned',
        params: parseRequestData,
        delay: () => Math.ceil(Math.random() * 3000),
    },
    'beScanned': {
        url: '/contract/beScanned',
        method: 'get',
        mock: './dummy/contract/beScanned',
        params: parseRequestData
    },
    'user/get': {
        url: '/user',
        method: 'get',
        mock: './dummy/user/get',
    },
    'numberQuery':{
        url: '/numberQuery',
        method: 'get',
        mock: './dummy/numberQuery',
        params: parseRequestData
    },
    'contractFiling':{
        url: '/contractFiling',
        method: 'post',
        mock: './dummy/contractFiling',
        data: parseRequestData
    },
}

export default config
