import { fakerZH_CN as faker } from '@faker-js/faker';
import { getToken } from '@/utils/auth'
import { resolveToken } from '@/services/utils'
// faker.setLocale('zh_CN');

const ROLES = {
    'admin': ['admin', 'referee', 'player'],
    'guest': [],
    'player': ['player'],
    'referee': ['referee']
}

export default ({ request: req }) => {

    const id = resolveToken(getToken())
    const name = faker.person.lastName() + faker.person.firstName()
    const avatar = faker.image.avatar()
    const email = faker.internet.email({ firstName: id })
    const phone = faker.phone.number()
    const role = ROLES[id] || ROLES['guest']
    return {
        code: 1,
        data: {
            id,
            name,
            avatar,
            email,
            phone,
            role
        }
    }
}