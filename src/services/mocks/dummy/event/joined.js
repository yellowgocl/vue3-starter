import { fakerZH_CN as faker } from '@faker-js/faker'
import { HttpResponse } from 'msw'
const JOINED_MAP = [
    'id-0'
]
const ERROR_MAP = {
    404: { status: 404, statusText: 'Record not found', }
}
export default (context) => {
    const { request, params } = context
    const { id } = params || {}
    const headers = request?.headers
    const token = headers.get('Authorization')
    const flag = token && JOINED_MAP.includes(id)
    const code = flag ? 1 : 404
    return HttpResponse.json({
        code,
        data: { message: flag ? "已有存在报名信息记录" : "没有存在报名信息记录" }
    }, ERROR_MAP[code])
}
