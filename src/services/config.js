const config = {
    'login': {
        url: '/api/login',
        method: 'post',
        mock: './dummy/login'
    },
    'contract/list': {
        url: '/api/contract/list',
        method: 'get',
        mock: './dummy/contract/list'
    },
    'user/get': {
        url: '/api/user',
        method: 'get',
        mock: './dummy/user/get'
    },
}

export default config
