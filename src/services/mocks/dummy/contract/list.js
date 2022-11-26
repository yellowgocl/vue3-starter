import { faker } from '@faker-js/faker';
import { times } from 'lodash'
faker.setLocale('zh_CN');

const total = 10

const gen = (type, page, size = 10) => {
    const len = page === total ? 3 : size
    return times(len).map((v, k) => ({
        name: faker.company.bs(),
        id: page * size + k
    }))
}

export default (req) => {
    // const { type, page, size, account } = req.body || {}
    const searchParams = req.url.searchParams
    const page = Number.parseInt(searchParams.get('page'))
    const size = Number.parseInt(searchParams.get('size'))
    const account = searchParams.get('account')
    const type = searchParams.get('type')
    const list = gen(type, page, size)
    return {
        page,
        size,
        total,
        list,
    }
}