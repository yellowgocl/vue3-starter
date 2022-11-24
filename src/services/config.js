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
    'contract/list': {
        url: '/api/contract/list',
        method: 'get',
        mock: './dummy/contract/list',
        params: parseRequestData
    },
    'user/get': {
        url: '/api/user',
        method: 'get',
        mock: './dummy/user/get'
    },
}

export default config
