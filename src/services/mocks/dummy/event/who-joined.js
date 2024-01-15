
import { fakerZH_CN as faker } from '@faker-js/faker'
import { HttpResponse } from 'msw'
import { find } from 'lodash'
import { EVENT_LIST } from './list'
const JOINED_MAP = [
    'id-0'
]
const ERROR_MAP = {
    404: { status: 404, statusText: 'Record not found', }
}

export default (context) => {
    const { request, params } = context
    const { id: eventId } = params || {}
    const event = EVENT_LIST.find(({ id }) => (id === eventId))
    const { joined: count } = event
    const flag = !!event
    const code = flag ? 1 : 404
    function createEvent(_, index) {
        const name = faker.person.lastName() + faker.person.firstName()
        const avatar = faker.image.avatar()
        return {
          eventId,
          name,
          avatar
        }
    }
    const data = flag ? faker.helpers.multiple(createEvent, { count }) : { message: 'Event not found' }
    return HttpResponse.json({
        code,
        data
    }, ERROR_MAP[code])
}
