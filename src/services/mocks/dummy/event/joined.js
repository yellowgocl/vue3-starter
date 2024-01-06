import { fakerZH_CN as faker } from '@faker-js/faker'
import { HttpResponse } from 'msw'
const JOINED_MAP = [
    'id-0'
]
export default async (context) => {
    const { request, params } = context
    const { id } = params || {}
    // const headers = request?.headers
    // const token = headers.get('Authorization')
    const flag = JOINED_MAP.includes(id)
    const response = flag ? HttpResponse.json({
        code: 1,
        data: { message: "已有存在报名信息记录" }
    }) : new HttpResponse(null, { status: 404 })
    return response
}
