import { faker } from '@faker-js/faker';
import { times } from 'lodash'
faker.setLocale('zh_CN');

const totalContent = 56
const defaultPageSize = 10
const total = Math.ceil(totalContent / defaultPageSize)

const gen = (type, page, size = defaultPageSize) => {
    const len = page === total ? totalContent - ((page - 1) * size) : size
    return times(len).map((v, k) => ({
        contractNo: `${CFFT20160300}${k}`,
        contractName: faker.company.bs(),
        projectName: faker.company.bs(),
        company: faker.company.name(),
        id: page * size + k
    }))
}

export default (req) => {
    // const { type, page, size, account } = req.body || {}
    const searchParams = req.url.searchParams
    const page = Number.parseInt(searchParams.get('page'))
    const pagesize = Number.parseInt(searchParams.get('size'))
    const account = searchParams.get('account')
    const type = searchParams.get('type')
    const list = gen(type, page, pagesize)
    return {
        page,
        pagesize,
        totalPage:total,
        totalCount:totalContent,
        contractList: list,
    }
}