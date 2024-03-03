const config = {
  'user/list': {
    url: '/api/user/list',
    method: 'get',
    mock: './dummy/user/list',
  },
  'user/get': {
    url: '/api/user',
    method: 'get',
    mock: './dummy/user/get',
    meta: {
      requireAuth: true,
    },
  },
  'user/update': {
    url: '/api/user',
    method: 'post',
    mock: './dummy/user/post',
    meta: {
      requireAuth: true,
    },
  },
  'user/delete': {
    url: '/api/user',
    method: 'delete',
    meta: {
      requireAuth: true,
    },
  },
  'user/add': {
    url: '/api/user',
    method: 'put',
    meta: {
      requireAuth: true,
    },
  },
  'auth/login': {
    url: '/api/auth/login',
    method: 'post',
    mock: './dummy/auth/login',
  },
  'auth/refresh': {
    url: '/api/auth/refresh',
    method: 'post',
    mock: './dummy/auth/refresh',
    meta: {
      requireAuth: true,
    },
  },
  'event/list': {
    url: '/api/event/list',
    method: 'get',
    mock: './dummy/event/list',
  },
  'event/detail': {
    url: '/api/event/:id',
    method: 'get',
    mock: './dummy/event/detail',
  },
  'event/join': {
    url: '/api/join/:id',
    method: 'post',
    mock: './dummy/event/join',
    meta: {
      requireAuth: true,
    },
  },
  'event/joined': {
    url: '/api/joined/:id',
    method: 'post',
    mock: './dummy/event/joined',
  },
  'event/who-joined': {
    url: '/api/who-joined/:id',
    method: 'post',
    mock: './dummy/event/who-joined',
  },
  'ranking/list': {
    url: '/api/ranking/:range',
    method: 'get',
    mock: './dummy/ranking/list',
  },
  'wechat/jssdk': {
    url: '/api/wechat/jssdk',
    method: 'get',
    mock: './dummy/wechat/jssdk',
  },
  'wechat/auth': {
    url: '/api/wechat/auth',
    method: 'get',
    mock: './dummy/wechat/auth',
  },
}

export default config
