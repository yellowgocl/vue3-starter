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
        url: '/tms/newContract/newContract.do',
        method: 'post',
        mock: './dummy/contract/scanned',
        params: { method: 'getfiledContract'},
        data: parseRequestData,
        delay: () => Math.ceil(Math.random() * 3000),
    },
    'beScanned': {
        url: '/tms/newContract/newContract.do',
        method: 'post',
        mock: './dummy/contract/beScanned',
        params: { method: 'getUnfiledContract'},
        data: parseRequestData,
        delay: () => Math.ceil(Math.random() * 3000),
    },
    'numberQuery':{
        url: '/tms/newContract/newContract.do',
        method: 'post',
        mock: './dummy/numberQuery',
        params: { method: 'viewContractInfo'},
        data: parseRequestData
    },
    'contractFiling':{
        url: '/tms/newContract/newContract.do',
        method: 'post',
        mock: './dummy/contractFiling',
        params: { method: 'fileContract'},
        data: parseRequestData
    },
}

export default config
