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
        url: '/tms/newContract/newContract.do/method=pdaLogin',
        method: 'post',
        mock: './dummy/login',
    },
    'scanned': {
        url: '/tms/newContract/newContract.do/method=getfiledContract',
        method: 'post',
        mock: './dummy/contract/scanned',
        data: parseRequestData,
        delay: () => Math.ceil(Math.random() * 3000),
    },
    'beScanned': {
        url: '/tms/newContract/newContract.do/method=getUnfiledContract',
        method: 'post',
        mock: './dummy/contract/beScanned',
        data: parseRequestData,
        delay: () => Math.ceil(Math.random() * 3000),
    },
    'numberQuery':{
        url: '/tms/newContract/newContract.do/method=viewContractInfo',
        method: 'post',
        mock: './dummy/numberQuery',
        data: parseRequestData
    },
    'contractFiling':{
        url: '/tms/newContract/newContract.do/method=fileContract',
        method: 'post',
        mock: './dummy/contractFiling',
        data: parseRequestData
    },
}

export default config
