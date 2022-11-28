import { faker } from '@faker-js/faker';
import { times } from 'lodash'
import moment from 'moment'
faker.setLocale('zh_CN');

let totalContent = 1
const defaultPageSize = 1
const total = Math.ceil(totalContent / defaultPageSize)

const gen = (start, end, page, size = defaultPageSize) => {
    const len = page === total ? totalContent - ((page - 1) * size) : size
    // console.info({page, total, totalContent, value: totalContent - ((page - 1) * size), size })
    // console.info({start, end})
    return times(len).map((v, k) => ({
        contractNo: `CFFT201603${page * size + k}`,
        contractName: '合同名称-' + `CFFT201603${page * size + k}`,
        projectName:'续签2个月经销服务合同到期'+`${page * size + k}`,
        company:'芜湖亚凯汽车销售服务有限公司'+`${page * size + k}`,
        id: page * size + k,
        
    }))
}

export default (req) => {
    const searchParams = req.url.searchParams
    totalContent = Number.parseInt(searchParams.get('totalCount') || totalContent)
    const page = Number.parseInt(searchParams.get('page'))
    const pagesize = Number.parseInt(searchParams.get('size') || defaultPageSize)
    const fileDateGe = searchParams.get('fileDateGe')
    const fileDateLe = searchParams.get('fileDateLe')
    const contractList = gen(fileDateGe, fileDateLe, page, pagesize)
    // if (page == 2) return null; // dummy error for frond end test
    return {
        index: page - 1,
        pagesize,
        totalPage: total,
        totalCount: totalContent,
        contractList,
    }
}