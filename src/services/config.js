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
  },
  'user/update': {
    url: '/api/user',
    method: 'post',
    mock: './dummy/user/post',
  },
  'user/delete': {
    url: '/api/user',
    method: 'delete',
  },
  'user/add': {
    url: '/api/user',
    method: 'put',
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
  },
  'event/joined': {
    url: '/api/joined/:id',
    method: 'post',
    mock: './dummy/event/joined',
  },
}

export default config
