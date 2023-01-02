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
        url: '/tms/newContract/newContract.do?method=pdaLogin',
        method: 'post',
        mock: './dummy/newContract',
    },
    'scanned': {
        url: '/tms/newContract/newContract.do?method=getfiledContract',
        method: 'post',
        mock: './dummy/newContract',
        data: parseRequestData,
        delay: () => Math.ceil(Math.random() * 3000),
    },
    'beScanned': {
        url: '/tms/newContract/newContract.do?method=getUnfiledContract',
        method: 'post',
        mock: './dummy/newContract',
        data: parseRequestData,
        delay: () => Math.ceil(Math.random() * 3000),
    },
    'numberQuery':{
        url: '/tms/newContract/newContract.do?method=viewContractInfo',
        method: 'post',
        mock: './dummy/newContract',
        data: parseRequestData
    },
    'contractFiling':{
        url: '/tms/newContract/newContract.do?method=fileContract',
        method: 'post',
        mock: './dummy/newContract',
        data: parseRequestData
    },
}

export default config
